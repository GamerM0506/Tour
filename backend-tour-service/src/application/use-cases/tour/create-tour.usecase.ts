import { CreateTourRequest } from "src/application/dtos/tour/requests/create-tour.request";
import { TourResponse } from "src/application/dtos/tour/responses/tour.response";
import { IMediaService } from "src/application/interfaces/IMediaService";
import { ITourRepository } from "src/domain/repositories/tour.repository";
import { Tour } from "src/domain/entities/tour.entity";
import { Price } from "src/domain/value-objects/price.vo";
import { Media } from "src/domain/value-objects/media.vo";
import { MediaType } from "src/domain/enums/mediatype.enum";

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

        const price = new Price(dto.baseAmount);
        
        const tour = new Tour(
            dto.title,
            dto.overview,
            dto.duration,
            dto.meetingPoint,
            dto.categories,
            dto.route,
            dto.startTimes,
            price,
            dto.wheelchairAccessible,
            dto.supportedAllergies,
            dto.highlights,
            dto.itinerary,
            dto.accessibilityNotes,
            new Media(thumbnailUrl, MediaType.IMAGE, dto.title, dto.title, true),
            galleryUrls.map(url => new Media(url, MediaType.IMAGE))
        );

        await this.tourRepo.save(tour);

        return {
            id: tour.id,
            title: tour.title,
            overview: tour.overview,
            priceInfo: {
                baseAmount: tour.price.baseAmount,
                currency: tour.price.currency
            },
            media: {
                thumbnail: tour.thumbnail.url,
                gallery: tour.gallery.map(m => m.url)
            }
        };
    }
}