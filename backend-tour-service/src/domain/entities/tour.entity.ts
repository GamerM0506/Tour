import { BaseEntity } from './base.entity';
import { Price } from '../value-objects/price.vo';
import { ItineraryStep } from '../value-objects/itinerary-step.vo';
import { Media } from '../value-objects/media.vo';
import { IncompatibleTourException } from '../exceptions/tour.exception';

export class Tour extends BaseEntity {
    constructor(
        public readonly title: string,
        public readonly overview: string,
        public readonly duration: string,
        public readonly meetingPoint: string,
        public readonly categories: string[],
        public readonly route: string,
        public readonly startTimes: string[],
        public readonly priceTiers: Price[],
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

    public getPriceTier(tierName: string): Price {
        const tier = this.priceTiers.find(
            t => t.tier.toLowerCase() === tierName.toLowerCase()
        );

        if (!tier) {
            throw new Error(`Pricing tier '${tierName}' not found for this tour.`);
        }
        return tier;
    }

    public calculateTotalPrice(
        tierName: string,
        adults: number,
        children: number = 0,
        infants: number = 0
    ): number {
        const selectedPrice = this.getPriceTier(tierName);
        const under12s = children + infants;
        return selectedPrice.calculateTotal(adults, under12s);
    }

    public validateGuestRequirements(needsWheelchair: boolean, guestAllergies: string[]): void {
        if (needsWheelchair && !this.wheelchairAccessible) {
            throw new IncompatibleTourException('This tour route is not wheelchair accessible.');
        }

        const unsupported = guestAllergies.filter(a => !this.supportedAllergies.includes(a));
        if (unsupported.length > 0) {
            throw new IncompatibleTourException(
                `The tour does not support safety for these allergies: ${unsupported.join(', ')}`
            );
        }
    }

    public updateDetails(props: {
        title?: string;
        overview?: string;
        duration?: string;
        meetingPoint?: string;
        categories?: string[];
        route?: string;
        startTimes?: string[];
        priceTiers?: Price[];
        wheelchairAccessible?: boolean;
        supportedAllergies?: string[];
        highlights?: string[];
        itinerary?: ItineraryStep[];
        accessibilityNotes?: string[];
        thumbnail?: Media;
        gallery?: Media[];
        introVideoUrl?: string;
    }): void {
        if (props.title) (this as any).title = props.title;
        if (props.overview) (this as any).overview = props.overview;
        if (props.duration) (this as any).duration = props.duration;
        if (props.priceTiers) (this as any).priceTiers = props.priceTiers;
        if (props.itinerary) (this as any).itinerary = props.itinerary;
        if (props.thumbnail) (this as any).thumbnail = props.thumbnail;
        if (props.gallery) (this as any).gallery = props.gallery;
        if (props.meetingPoint) (this as any).meetingPoint = props.meetingPoint;
        if (props.categories) (this as any).categories = props.categories;
        if (props.route) (this as any).route = props.route;
        if (props.startTimes) (this as any).startTimes = props.startTimes;
        if (props.highlights) (this as any).highlights = props.highlights;
        if (props.accessibilityNotes) (this as any).accessibilityNotes = props.accessibilityNotes;
        if (props.introVideoUrl !== undefined) (this as any).introVideoUrl = props.introVideoUrl;
        if (props.wheelchairAccessible !== undefined) {
            (this as any).wheelchairAccessible = props.wheelchairAccessible;
        }
        if (props.supportedAllergies) (this as any).supportedAllergies = props.supportedAllergies;
        (this as any).updatedAt = new Date();
    }
}