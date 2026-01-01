export class TourResponse {
    id: string;
    title: string;
    overview: string;
    duration: string;
    priceTiers: {
        tier: string;
        baseAmount: number;
        currency: string;
        groupDiscountThreshold?: number;
    }[];
    
    media: {
        thumbnail: string;
        gallery: string[];
    };
    features: {
        wheelchairAccessible: boolean;
        supportedAllergies: string[];
    };
    rating?: number;
}