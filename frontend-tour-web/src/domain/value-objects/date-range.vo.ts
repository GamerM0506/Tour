export class DateRange {
    constructor(
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {
        if (startDate >= endDate) {
            throw new Error('The end date must be after the start date');
        }
    }

    get durationDays(): number {
        const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    get formattedRange(): string {
        return `${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}`;
    }
} 