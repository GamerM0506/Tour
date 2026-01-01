import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { IStripeService } from 'src/application/interfaces/stripe.service';
import { BookingNotFoundException } from 'src/domain/exceptions/booking.exception';
import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { BookingStatus } from 'src/domain/enums/booking-status.enum';

export class CancelBookingUseCase {
    constructor(
        private readonly unitOfWork: IUnitOfWork,
        private readonly stripeService: IStripeService
    ) { }

    async execute(bookingId: string): Promise<void> {
        await this.unitOfWork.run(async (tx) => {
            const booking = await tx.bookings.findById(bookingId);
            if (!booking || booking.status === BookingStatus.CANCELLED) return;

            if (booking.stripePaymentIntentId) {
                if (booking.paymentStatus === PaymentStatus.PAID) {
                    await this.stripeService.refundPayment(booking.stripePaymentIntentId);
                } else {
                    await this.stripeService.voidPayment(booking.stripePaymentIntentId);
                }
            }

            if (booking.status === BookingStatus.CONFIRMED) {
                const schedule = await tx.schedules.findByIdWithLock(booking.scheduleId);
                if (schedule) {
                    schedule.removeBooking(booking.totalGuests); 
                    await tx.schedules.update(schedule);
                }
            }

            booking.cancel(); 
            await tx.bookings.update(booking);
        });
    }
}