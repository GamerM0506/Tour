import { BaseEntity } from './base.entity';
import { ScheduleStatus } from '../enums/schedule-status.enum';
import { Price } from '../value-objects/price.vo';
import { PastScheduleException } from '../exceptions/schedule.exception';
import { BookingCapacityExceededException } from '../exceptions/booking.exception';

export class TourSchedule extends BaseEntity {
    private _status: ScheduleStatus;
    private _currentBookings: number;

    constructor(
        public readonly tourId: string,
        public readonly startTime: Date,
        public readonly maxCapacity: number,
        public readonly timeZone: string,
        currentBookings: number = 0,
        status: ScheduleStatus = ScheduleStatus.AVAILABLE,
        public readonly assignedStaff?: string,
        public readonly isHoliday: boolean = false,
        public readonly holidaySurcharge: number = 0,
        id?: string
    ) {
        super(id);
        this._currentBookings = currentBookings;
        this._status = status;
        this.validateTime();
    }

    get status(): ScheduleStatus { return this._status; }
    get currentBookings(): number { return this._currentBookings; }

    private validateTime(): void {
        if (new Date() > this.startTime) {
            throw new PastScheduleException();
        }
    }

    public hasEnoughSlots(requestedSlots: number): boolean {
        return (this._currentBookings + requestedSlots) <= this.maxCapacity &&
            this._status !== ScheduleStatus.CANCELLED;
    }

    get remainingSlots(): number {
        return this.maxCapacity - this._currentBookings;
    }

    public addBooking(count: number): void {
        if (!this.hasEnoughSlots(count)) {
            throw new BookingCapacityExceededException();
        }
        this._currentBookings += count;

        if (this._currentBookings === this.maxCapacity) {
            this._status = ScheduleStatus.FULL;
        }
    }

    public removeBooking(count: number): void {
        this._currentBookings = Math.max(0, this._currentBookings - count);
        if (this._currentBookings < this.maxCapacity) {
            this._status = ScheduleStatus.AVAILABLE;
        }
    }

    public calculateTotalSurcharge(adults: number, under12s: number): number {
        if (!this.isHoliday) return 0;
        const adultSurcharge = adults * this.holidaySurcharge;
        const under12Surcharge = under12s * (this.holidaySurcharge * 0.5);
        return adultSurcharge + under12Surcharge;
    }

    public calculateGrandTotal(
        tourPrice: Price,
        adults: number,
        children: number,
        infants: number
    ): number {
        const under12s = children + infants;
        const basePrice = tourPrice.calculateTotal(adults, under12s);
        const totalSurcharge = this.calculateTotalSurcharge(adults, under12s);
        return basePrice + totalSurcharge;
    }

    public getAvailablePrices(priceTiers: Price[]): { tierName: string, basePrice: number }[] {
        return priceTiers.map(tier => ({
            tierName: tier.tier,
            basePrice: tier.baseAmount
        }));
    }

    public updateDetails(props: {
        startTime?: Date;
        maxCapacity?: number;
        status?: ScheduleStatus;
        assignedStaff?: string;
        isHoliday?: boolean;
        holidaySurcharge?: number;
    }): void {
        if (props.startTime) {
            (this as any).startTime = props.startTime;
            this.validateTime();
        }

        if (props.maxCapacity !== undefined) {
            if (props.maxCapacity < this.currentBookings) {
                throw new Error("The new capacity must not be less than the number of guests already booked");
            }
            (this as any).maxCapacity = props.maxCapacity;
        }

        if (props.status) this._status = props.status;
        if (props.assignedStaff !== undefined) (this as any).assignedStaff = props.assignedStaff;
        if (props.isHoliday !== undefined) (this as any).isHoliday = props.isHoliday;
        if (props.holidaySurcharge !== undefined) (this as any).holidaySurcharge = props.holidaySurcharge;

        (this as any).updatedAt = new Date();
    }

    public cancel(): void {
        this._status = ScheduleStatus.CANCELLED;
        this.softDelete();
    }
}