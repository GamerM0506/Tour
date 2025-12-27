export class CreateTourRequest {
    title: string;
    overview: string;
    duration: string;
    meetingPoint: string;
    categories: string[];
    baseAmount: number;
    wheelchairAccessible: boolean;
    supportedAllergies: string[];
    itinerary: any[];
    thumbnail: any;
    gallery: any[];
    route: string;
    startTimes: string[];
    highlights: string[];
    accessibilityNotes: string[];
    introVideoUrl?: string;
}