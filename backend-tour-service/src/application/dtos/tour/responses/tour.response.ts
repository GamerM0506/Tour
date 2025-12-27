export class TourResponse {
    id: string;
    title: string;
    overview: string;
    priceInfo: {
        baseAmount: number;
        currency: string;
    };
    media: {
        thumbnail: string;
        gallery: string[];
    };
    rating?: number;
}