export type ScheduleStatus = 'available' | 'full' | 'cancelled';

export class TourSchedule {
    constructor(
        public readonly id: string,
        public readonly tourId: string,
        public readonly startTime: Date,
        public readonly maxCapacity: number,
        public readonly availableSlots: number,
        public readonly status: ScheduleStatus,
    ) { }

    get canBook(): boolean {
        return this.status === 'available' && this.availableSlots > 0 && this.startTime > new Date();
    }

    get occupancyPercentage(): number {
        return Math.round(((this.maxCapacity - this.availableSlots) / this.maxCapacity) * 100);
    }
}