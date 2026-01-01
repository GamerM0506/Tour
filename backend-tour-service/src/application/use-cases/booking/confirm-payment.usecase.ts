import { IBookingRepository } from 'src/domain/repositories/booking.repository';
import { ITourScheduleRepository } from 'src/domain/repositories/tour-schedule.repository';
import { IStripeService } from 'src/application/interfaces/stripe.service';
import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { ScheduleNotFoundException } from 'src/domain/exceptions/schedule.exception';
import { BookingCapacityExceededException, BookingNotFoundException } from 'src/domain/exceptions/booking.exception';

export class ConfirmPaymentUseCase {
    constructor(
        private readonly bookingRepo: IBookingRepository,
        private readonly stripeService: IStripeService,
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(paymentIntentId: string): Promise<void> {
        const booking = await this.bookingRepo.findByPaymentIntentId(paymentIntentId);
        if (!booking || booking.paymentStatus === PaymentStatus.PAID) return;

        await this.unitOfWork.run(async (tx) => {
            const schedule = await tx.schedules.findByIdWithLock(booking.scheduleId);
            if (!schedule) throw new ScheduleNotFoundException();

            if (schedule.hasEnoughSlots(booking.totalGuests)) {
                await this.stripeService.capturePayment(paymentIntentId);

                booking.confirmAndCapture();
                schedule.addBooking(booking.totalGuests);

                await tx.bookings.update(booking);
                await tx.schedules.update(schedule);
            } else {
                await this.stripeService.voidPayment(paymentIntentId);
                booking.cancel();
                await tx.bookings.update(booking);
                throw new BookingCapacityExceededException();
            }
        });
    }
}