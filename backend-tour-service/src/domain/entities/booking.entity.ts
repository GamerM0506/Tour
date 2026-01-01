import { BaseEntity } from './base.entity';
import { BookingStatus } from '../enums/booking-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { CancellationDeadlineException } from '../exceptions/booking.exception';

export class Booking extends BaseEntity {
    private _status: BookingStatus;
    private _paymentStatus: PaymentStatus;
    private _stripePaymentIntentId?: string;

    constructor(
        public readonly scheduleId: string,
        public readonly contactEmail: string,
        public readonly contactPhone: string,
        public readonly guestName: string,
        public readonly guestEmail: string,
        public readonly guestPhone: string,
        public readonly adultsCount: number,
        public readonly childrenCount: number,
        public readonly infantsCount: number,
        public readonly selectedTierName: string,
        public readonly totalPrice: number,
        public readonly tourStartTime: Date,
        public readonly dietaryRequirements: string[] = [],
        public readonly isWheelchairRequired: boolean = false,
        public readonly customerNote: string = '',
        status: BookingStatus = BookingStatus.PENDING,
        paymentStatus: PaymentStatus = PaymentStatus.UNPAID,
        stripePaymentIntentId?: string,
        id?: string
    ) {
        super(id);
        this._status = status;
        this._paymentStatus = paymentStatus;
        this._stripePaymentIntentId = stripePaymentIntentId;
        this.validateBooking();
    }

    get totalGuests(): number {
        return this.adultsCount + this.childrenCount + this.infantsCount;
    }

    get status(): BookingStatus { return this._status; }
    get paymentStatus(): PaymentStatus { return this._paymentStatus; }
    get stripePaymentIntentId(): string | undefined { return this._stripePaymentIntentId; }

    private validateBooking(): void {
        if (this.adultsCount < 1) throw new Error("At least one adult is required.");
        if (this.totalPrice < 0) throw new Error("Total price cannot be negative.");
    }

    public cancel(): void {
        if (!this.canCancel()) {
            throw new CancellationDeadlineException();
        }
        this._status = BookingStatus.CANCELLED;
        this.softDelete();
    }

    public canCancel(): boolean {
        const now = new Date();
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
        return (this.tourStartTime.getTime() - now.getTime()) > twentyFourHoursInMs;
    }

    public markAsAuthorized(stripePaymentIntentId: string): void {
        this._stripePaymentIntentId = stripePaymentIntentId;
        this._paymentStatus = PaymentStatus.AUTHORIZED;
    }

    public confirmAndCapture(): void {
        this._paymentStatus = PaymentStatus.PAID;
        this._status = BookingStatus.CONFIRMED;
    }

    public completePayment(paymentIntentId: string): void {
        this._stripePaymentIntentId = paymentIntentId;
        this._paymentStatus = PaymentStatus.PAID;
        this._status = BookingStatus.CONFIRMED;
    }
}