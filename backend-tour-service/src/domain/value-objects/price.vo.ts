import { Currency } from "../enums/currency.enum";
import {
    BookingCapacityExceededException,
    InvalidGuestCountException
} from "../exceptions/booking.exception";

export class Price {
    constructor(
        public readonly baseAmount: number,
        public readonly currency: Currency = Currency.USD,
        public readonly tier: 'budget' | 'standard' | 'premium' = 'standard',
        public readonly minGuests: number = 1,
        public readonly maxGuests: number = 15,
        public readonly groupDiscountThreshold?: number,
        public readonly discountedAmount?: number
    ) {
        this.validateBaseAmount();
    }

    private validateBaseAmount(): void {
        if (this.baseAmount <= 0) {
            throw new Error("Price amount must be greater than zero");
        }
    }

    public getPerAdultRate(totalPax: number): number {
        if (this.groupDiscountThreshold && totalPax >= this.groupDiscountThreshold) {
            return this.discountedAmount ?? this.baseAmount;
        }
        return this.baseAmount;
    }

    public calculateTotal(
        adults: number,
        under12s: number = 0
    ): number {
        const totalPax = adults + under12s;
        this.validateGuestCount(totalPax);
        const adultRate = this.getPerAdultRate(totalPax);
        const adultsTotal = adults * adultRate;
        const under12sTotal = under12s * (adultRate * 0.5);
        return adultsTotal + under12sTotal;
    }

    private validateGuestCount(count: number): void {
        if (count < this.minGuests || count <= 0) {
            throw new InvalidGuestCountException();
        }
        if (count > this.maxGuests) {
            throw new BookingCapacityExceededException();
        }
    }
}