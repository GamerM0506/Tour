import { MediaDto } from "./media.dto";
import { ItineraryStepDto } from "./itinerary-step.dto";

export class PriceTierDto {
    tier: 'budget' | 'standard' | 'premium';
    baseAmount: number;
    groupDiscountThreshold?: number;
    discountedAmount?: number;
    maxGuests: number;
}

export class CreateTourRequest {
    title: string;
    overview: string;
    duration: string;
    meetingPoint: string;
    categories: string[];
    priceTiers: PriceTierDto[];
    wheelchairAccessible: boolean;
    supportedAllergies: string[];
    itinerary: ItineraryStepDto[];
    thumbnail: MediaDto;
    gallery: MediaDto[];
    route: string;
    startTimes: string[];
    highlights: string[];
    accessibilityNotes: string[];
    introVideoUrl?: string;
}