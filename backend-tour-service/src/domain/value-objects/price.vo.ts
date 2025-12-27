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
        if (count < this.minGuests) {
            throw new Error(`This tour requires a minimum of ${this.minGuests} guests.`);
        }

        if (count > this.maxGuests) {
            throw new Error(`This tour only accepts a maximum of ${this.maxGuests} guests.`);
        }
    }

    get perPersonRate(): number {
        return this.baseAmount + (this.isPrivate ? 5 : 0);
    }

    public calculateTotal(guests: number): number {
        this.validateGuestCount(guests);
        return this.perPersonRate * guests;
    }
}