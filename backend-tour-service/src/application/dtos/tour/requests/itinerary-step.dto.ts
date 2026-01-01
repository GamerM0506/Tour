import { MediaDto } from "./media.dto";

export class ItineraryStepDto {
    title: string;
    description: string;
    timeSlot?: string;
    durationMinutes: number;
    image?: MediaDto;
}