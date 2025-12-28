export class Tour {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly basePrice: number,
        public readonly images: string[],
        public readonly location: string,
        public readonly durationDays: number,
    ) { }

    get formattedPrice(): string {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(this.basePrice);
    }

    get tourSummary(): string {
        return `${this.durationDays} ngày tại ${this.location}`;
    }
}