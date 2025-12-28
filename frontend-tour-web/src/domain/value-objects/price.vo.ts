import { Currency } from "../enums/currency.enum";

export class Price {
    constructor(
        public readonly baseAmount: number,
        public readonly currency: Currency = Currency.USD,
        public readonly isPrivate: boolean = false,
        public readonly minGuests: number = 1,
        public readonly maxGuests: number = 10
    ) { }

    public validateGuestCount(count: number): void {
        if (count < this.minGuests) throw new Error(`Minium ${this.minGuests} guests.`);
        if (count > this.maxGuests) throw new Error(`Maximum ${this.maxGuests} guests.`);
    }

    get perPersonRate(): number {
        return this.baseAmount + (this.isPrivate ? 5 : 0);
    }

    public calculateTotal(guests: number): number {
        this.validateGuestCount(guests);
        return this.perPersonRate * guests;
    }

    public format(amount: number): string {
        return new Intl.NumberFormat(this.currency === Currency.VND ? 'vi-VN' : 'en-US', {
            style: 'currency',
            currency: this.currency,
        }).format(amount);
    }
}