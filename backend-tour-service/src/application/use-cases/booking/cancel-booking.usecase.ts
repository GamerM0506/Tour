import { IBookingRepository } from 'src/domain/repositories/booking.repository'
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { IStripeService } from 'src/application/interfaces/stripe.service';
import { BookingNotFoundException } from 'src/domain/exceptions/booking.exception';

export class CancelBookingUseCase {
    constructor(
        private readonly bookingRepo: IBookingRepository,
        private readonly stripeService: IStripeService
    ) { }

    async execute(bookingId: string): Promise<void> {
        const booking = await this.bookingRepo.findById(bookingId);
        if (!booking) throw new BookingNotFoundException();

        if (booking.stripePaymentIntentId) {
            if (booking.paymentStatus === PaymentStatus.PAID) {
                await this.stripeService.refundPayment(booking.stripePaymentIntentId);
            } else if (booking.paymentStatus === PaymentStatus.AUTHORIZED) {
                await this.stripeService.voidPayment(booking.stripePaymentIntentId);
            }
        }
        booking.cancel();
        await this.bookingRepo.update(booking);
    }
}