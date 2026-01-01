import { CreateTourRequest } from "src/application/dtos/tour/requests/create-tour.request";
import { TourResponse } from "src/application/dtos/tour/responses/tour.response";
import { IMediaService } from "src/application/interfaces/IMediaService";
import { ITourRepository } from "src/domain/repositories/tour.repository";
import { Tour } from "src/domain/entities/tour.entity";
import { Price } from "src/domain/value-objects/price.vo";
import { Media } from "src/domain/value-objects/media.vo";
import { MediaType } from "src/domain/enums/mediatype.enum";
import { ItineraryStep } from "src/domain/value-objects/itinerary-step.vo";

export class CreateTourUseCase {
    constructor(
        private readonly tourRepo: ITourRepository,
        private readonly mediaService: IMediaService
    ) { }

    async execute(dto: CreateTourRequest): Promise<TourResponse> {
        const thumbnailUrl = await this.mediaService.uploadImage(dto.thumbnail);
        const galleryUrls = await Promise.all(
            (dto.gallery || []).map(file => this.mediaService.uploadImage(file))
        );

        const prices = dto.priceTiers.map(p => new Price(
            p.baseAmount, undefined, p.tier, 1, p.maxGuests,
            p.groupDiscountThreshold, p.discountedAmount
        ));

        const itinerarySteps = dto.itinerary.map(step => new ItineraryStep(
            step.timeSlot || "",
            step.title,
            step.durationMinutes,
            step.description,
            step.image ? new Media(step.image.url, step.image.type) : undefined
        ));

        const tour = new Tour(
            dto.title,
            dto.overview,
            dto.duration,
            dto.meetingPoint,
            dto.categories,
            dto.route,
            dto.startTimes,
            prices,
            dto.wheelchairAccessible,
            dto.supportedAllergies,
            dto.highlights,
            itinerarySteps,
            dto.accessibilityNotes,
            new Media(thumbnailUrl, MediaType.IMAGE, dto.title, dto.title, true),
            galleryUrls.map(url => new Media(url, MediaType.IMAGE))
        );

        await this.tourRepo.save(tour);

        return {
            id: tour.id,
            title: tour.title,
            overview: tour.overview,
            duration: tour.duration,
            priceTiers: tour.priceTiers.map(p => ({
                tier: p.tier,
                baseAmount: p.baseAmount,
                currency: p.currency,
                groupDiscountThreshold: p.groupDiscountThreshold
            })),
            media: {
                thumbnail: tour.thumbnail.url,
                gallery: tour.gallery.map(m => m.url)
            },
            features: {
                wheelchairAccessible: tour.wheelchairAccessible,
                supportedAllergies: tour.supportedAllergies
            }
        };
    }
}