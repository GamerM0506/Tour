import { BaseEntity } from './base.entity';
import { Price } from '../value-objects/price.vo';
import { ItineraryStep } from '../value-objects/itinerary-step.vo';
import { IncompatibleTourException } from '../exceptions/tour.exception';
import { Media } from '../value-objects/media.vo';

export class Tour extends BaseEntity {
    constructor(
        public readonly title: string,
        public readonly overview: string,
        public readonly duration: string,
        public readonly meetingPoint: string,
        public readonly categories: string[],
        public readonly route: string,
        public readonly startTimes: string[],
        public readonly price: Price,
        public readonly wheelchairAccessible: boolean,
        public readonly supportedAllergies: string[],
        public readonly highlights: string[],
        public readonly itinerary: ItineraryStep[],
        public readonly accessibilityNotes: string[],
        public readonly thumbnail: Media,
        public readonly gallery: Media[],
        public readonly introVideoUrl?: string,
        id?: string
    ) {
        super(id);
    }

    public getTotalPrice(guests: number): number {
        return this.price.calculateTotal(guests);
    }

    public validateGuestRequirements(needsWheelchair: boolean, guestAllergies: string[]): void {
        if (needsWheelchair && !this.wheelchairAccessible) {
            throw new IncompatibleTourException('This tour does not support wheelchairs.');
        }

        const unsupported = guestAllergies.filter(a => !this.supportedAllergies.includes(a));
        if (unsupported.length > 0) {
            throw new IncompatibleTourException(`Tour does not support the following allergies: ${unsupported.join(', ')}`);
        }
    }
}