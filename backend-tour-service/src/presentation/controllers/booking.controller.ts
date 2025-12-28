import { Controller, Post, Body, Param, Patch, Req, Headers, BadRequestException } from '@nestjs/common';
import { CreateReservationUseCase } from 'src/application/use-cases/booking/create-reservation.usecase';
import { ConfirmPaymentUseCase } from 'src/application/use-cases/booking/confirm-payment.usecase';
import { CancelBookingUseCase } from 'src/application/use-cases/booking/cancel-booking.usecase';
import { CreateBookingPayload } from '../middlewares/requests/booking/create-booking.payload';
import { CreateBookingRequest } from 'src/application/dtos/booking/requests/create-booking.request';

@Controller('bookings')
export class BookingController {
    constructor(
        private readonly createReservationUseCase: CreateReservationUseCase,
        private readonly confirmPaymentUseCase: ConfirmPaymentUseCase,
        private readonly cancelBookingUseCase: CancelBookingUseCase
    ) { }

    @Post()
    async reserve(@Body() payload: CreateBookingPayload) {
        const request: CreateBookingRequest = {
            ...payload,
            customerNote: payload.customerNote || ""
        };
        return await this.createReservationUseCase.execute(request);
    }

    @Patch(':id/cancel')
    async cancel(@Param('id') id: string) {
        return await this.cancelBookingUseCase.execute(id);
    }

    @Post('webhook')
    async handleStripeWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() req: any
    ) {
        if (!signature) throw new BadRequestException('Missing signature');
        const event = req.rawBody;
        const paymentIntentId = event.data?.object?.id;

        if (event.type === 'payment_intent.succeeded') {
            return await this.confirmPaymentUseCase.execute(paymentIntentId);
        }
    }
}