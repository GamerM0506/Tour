import { Media } from './media.vo';

export class ItineraryStep {
    constructor(
        public readonly timeSlot: string,
        public readonly title: string,
        public readonly durationMinutes: number,
        public readonly description: string,
        public readonly image?: Media,
        public readonly options?: string[]
    ) { }
}