import { BaseEntity } from './base.entity';
import { BookingStatus } from '../enums/booking-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { CancellationDeadlineException } from '../exceptions/booking.exception';

export class Booking extends BaseEntity {
    constructor(
        public readonly scheduleId: string,
        public readonly contactEmail: string,
        public readonly contactPhone: string,
        public readonly guestName: string,
        public readonly guestEmail: string,
        public readonly guestPhone: string,
        public readonly customerNote: string,
        public readonly numberOfGuests: number,
        public readonly totalPrice: number,
        public readonly tourStartTime: Date,
        public readonly paymentStatus: PaymentStatus = PaymentStatus.UNPAID,
        public readonly status: BookingStatus = BookingStatus.PENDING,
        public readonly stripePaymentIntentId?: string,
        id?: string
    ) {
        super(id);
    }

    public cancel(): void {
        if (!this.canCancel()) {
            throw new CancellationDeadlineException();
        }
        (this as any).status = BookingStatus.CANCELLED;
        this.softDelete();
    }
    
    public canCancel(): boolean {
        const now = new Date();
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
        return (this.tourStartTime.getTime() - now.getTime()) > twentyFourHoursInMs;
    }

    public markAsAuthorized(stripePaymentIntentId: string): void {
        (this as any).stripePaymentIntentId = stripePaymentIntentId;
        (this as any).paymentStatus = PaymentStatus.AUTHORIZED;
    }

    public confirmAndCapture(): void {
        (this as any).paymentStatus = PaymentStatus.PAID;
        (this as any).status = BookingStatus.CONFIRMED;
    }
}