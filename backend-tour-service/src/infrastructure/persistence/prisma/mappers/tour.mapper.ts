import { Tour as PrismaTour } from '@prisma/client';
import { Tour } from 'src/domain/entities/tour.entity';
import { Price } from 'src/domain/value-objects/price.vo';
import { Media } from 'src/domain/value-objects/media.vo';
import { Currency } from 'src/domain/enums/currency.enum';
import { MediaType } from 'src/domain/enums/mediatype.enum';

export class TourMapper {
    static toDomain(raw: PrismaTour): Tour {
        const thumb = raw.thumbnail as any;
        const gall = (raw.gallery as any[]) || [];
        const priceTiers = (raw.priceTiers as any[]).map(p => new Price(
            p.baseAmount,
            p.currency as Currency,
            p.tier,
            p.minGuests,
            p.maxGuests,
            p.groupDiscountThreshold,
            p.discountedAmount
        ));

        return new Tour(
            raw.title,
            raw.overview,
            raw.duration,
            raw.meetingPoint,
            raw.categories,
            raw.route,
            raw.startTimes,
            priceTiers, 
            raw.wheelchairAccessible,
            raw.supportedAllergies,
            raw.highlights,
            raw.itinerary as any[],
            raw.accessibilityNotes,
            new Media(thumb.url, thumb.type as MediaType, thumb.alt, thumb.title, true),
            gall.map(m => new Media(m.url, m.type as MediaType, m.alt, m.title)),
            raw.introVideoUrl || undefined,
            raw.id
        );
    }

    static toPersistence(entity: Tour): any {
        return {
            id: entity.id,
            title: entity.title,
            overview: entity.overview,
            duration: entity.duration,
            meetingPoint: entity.meetingPoint,
            categories: entity.categories,
            route: entity.route,
            startTimes: entity.startTimes,
            priceTiers: entity.priceTiers.map(p => ({
                baseAmount: p.baseAmount,
                currency: p.currency,
                tier: p.tier,
                minGuests: p.minGuests,
                maxGuests: p.maxGuests,
                groupDiscountThreshold: p.groupDiscountThreshold,
                discountedAmount: p.discountedAmount
            })),
            wheelchairAccessible: entity.wheelchairAccessible,
            supportedAllergies: entity.supportedAllergies,
            highlights: entity.highlights,
            itinerary: entity.itinerary,
            accessibilityNotes: entity.accessibilityNotes,
            thumbnail: entity.thumbnail,
            gallery: entity.gallery,
            introVideoUrl: entity.introVideoUrl,
            deletedAt: entity.deletedAt
        };
    }
}