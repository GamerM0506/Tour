import { BaseEntity } from './base.entity';
import { ScheduleStatus } from '../enums/schedule-status.enum';
import { Price } from '../value-objects/price.vo';

export class TourSchedule extends BaseEntity {
    constructor(
        public readonly tourId: string,
        public readonly startTime: Date,
        public readonly maxCapacity: number,
        public readonly timeZone: string,
        private _currentBookings: number = 0,
        public status: ScheduleStatus = ScheduleStatus.AVAILABLE,
        public readonly assignedStaff?: string,
        public readonly isHoliday: boolean = false,
        id?: string
    ) {
        super(id);
        this.validateTime();
    }

    private validateTime(): void {
        if (new Date() > this.startTime) {
            throw new Error("Cannot create a schedule in the past");
        }
    }

    public calculateEndTime(durationHours: number): Date {
        const end = new Date(this.startTime);
        end.setHours(end.getHours() + durationHours);
        return end;
    }

    public hasEnoughSlots(requestedSlots: number): boolean {
        return (this._currentBookings + requestedSlots) <= this.maxCapacity && this.status !== ScheduleStatus.CANCELLED;
    }

    get remainingSlots(): number {
        return this.maxCapacity - this._currentBookings;
    }

    public addBooking(count: number): void {
        if (!this.hasEnoughSlots(count)) {
            throw new Error("This schedule is full.");
        }
        this._currentBookings += count;

        if (this._currentBookings === this.maxCapacity) {
            this.status = ScheduleStatus.FULL;
        }
    }

    public getFinalPrice(basePrice: Price): number {
        let rate = basePrice.perPersonRate;

        if (this.isHoliday) {
            rate = rate * 1.15;
        }

        return rate;
    }
}