import { Currency } from "../enums/currency.enum";
import { BookingCapacityExceededException, InvalidGuestCountException } from "../exceptions/booking.exception";
import { InvalidTourPriceException } from "../exceptions/tour.exception";

export class Price {
    constructor(
        public readonly baseAmount: number,
        public readonly currency: Currency = Currency.USD,
        public readonly isPrivate: boolean = false,
        public readonly minGuests: number = 1,
        public readonly maxGuests: number = 10
    ) {
        this.validatePricePackage();
    }

    private validatePricePackage(): void {
        const validPackages = [15, 40];
        if (!validPackages.includes(this.baseAmount)) {
            throw new InvalidTourPriceException(this.baseAmount);
        }
    }

    public validateGuestCount(count: number): void {
        if (count < this.minGuests || count <= 0) {
            throw new InvalidGuestCountException();
        }
        if (count > this.maxGuests) {
            throw new BookingCapacityExceededException();
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