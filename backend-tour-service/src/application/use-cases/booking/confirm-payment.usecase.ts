import { IBookingRepository } from 'src/domain/repositories/booking.repository';
import { ITourScheduleRepository } from 'src/domain/repositories/tour-schedule.repository';
import { IStripeService } from 'src/application/interfaces/stripe.service';
import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';

export class ConfirmPaymentUseCase {
    constructor(
        private readonly bookingRepo: IBookingRepository,
        private readonly stripeService: IStripeService,
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(paymentIntentId: string): Promise<void> {
        const booking = await this.bookingRepo.findByPaymentIntentId(paymentIntentId);
        if (!booking) throw new Error("The transaction does not exist in the system.");
        if (booking.paymentStatus === PaymentStatus.PAID) return;
        await this.unitOfWork.run(async (tx) => {
            const schedule = await tx.schedules.findByIdWithLock(booking.scheduleId);
            if (!schedule) throw new Error("Schedule not found.");

            if (schedule.hasEnoughSlots(booking.numberOfGuests)) {
                await this.stripeService.capturePayment(paymentIntentId);
                booking.confirmAndCapture();
                schedule.addBooking(booking.numberOfGuests);
                await tx.bookings.update(booking);
                await tx.schedules.update(schedule);
            } else {
                await this.stripeService.voidPayment(paymentIntentId);
                booking.softDelete();
                await tx.bookings.update(booking);
                throw new Error("Out of slots! Your payment has been voided.");
            }
        });
    }
}