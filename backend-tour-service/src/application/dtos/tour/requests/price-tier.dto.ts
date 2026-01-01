export class PriceTierDto {
    tier: 'budget' | 'standard' | 'premium';
    baseAmount: number;
    groupDiscountThreshold?: number;
    discountedAmount?: number;
    maxGuests: number;
}