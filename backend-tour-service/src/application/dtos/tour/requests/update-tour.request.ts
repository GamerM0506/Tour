export class UpdateTourRequest {
    title?: string;
    overview?: string;
    duration?: string;
    meetingPoint?: string;
    categories?: string[];
    baseAmount?: number;
    wheelchairAccessible?: boolean;
    supportedAllergies?: string[];
    highlights?: string[];
    itinerary?: any[];
    accessibilityNotes?: string[];
    thumbnail?: any;
    gallery?: any[];
    route?: string;
    startTimes?: string[];
    introVideoUrl?: string;
}