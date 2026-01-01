import { PriceTierDto } from "../requests/create-tour.request";
import { ItineraryStepDto } from "../requests/itinerary-step.dto";
import { MediaDto } from "../requests/media.dto";

export class UpdateTourRequest {
    title?: string;
    overview?: string;
    duration?: string;
    meetingPoint?: string;
    categories?: string[];
    priceTiers?: PriceTierDto[];
    wheelchairAccessible?: boolean;
    supportedAllergies?: string[];
    highlights?: string[];
    itinerary?: ItineraryStepDto[];
    accessibilityNotes?: string[];
    thumbnail?: MediaDto;
    gallery?: MediaDto[];
    route?: string;
    startTimes?: string[];
    introVideoUrl?: string;
}