// src/application/use-cases/tour/update-tour.usecase.ts

import { Tour } from "src/domain/entities/tour.entity"; // ĐÚNG: Import từ Domain
import { UpdateTourRequest } from "src/application/dtos/tour/requests/update-tour.request";
import { Media } from "src/domain/value-objects/media.vo";
import { IMediaService } from "src/application/interfaces/IMediaService";
import { MediaType } from "src/domain/enums/mediatype.enum";
import { TourNotFoundException } from "src/domain/exceptions/tour.exception";
import { ITourRepository } from "src/domain/repositories/tour.repository";
import { ItineraryStep } from "src/domain/value-objects/itinerary-step.vo";
import { Price } from "src/domain/value-objects/price.vo";

export class UpdateTourUseCase {
    constructor(
        private readonly tourRepo: ITourRepository,
        private readonly mediaService: IMediaService
    ) { }

    async execute(id: string, dto: UpdateTourRequest): Promise<void> {

        const tour = await this.tourRepo.findById(id);
        if (!tour || tour.isDeleted) throw new TourNotFoundException();

        const domainUpdates: any = {};
        if (dto.thumbnail) {
            const url = await this.mediaService.uploadImage(dto.thumbnail);
            domainUpdates.thumbnail = new Media(url, MediaType.IMAGE, tour.title, tour.title, true);
        }

        if (dto.gallery && dto.gallery.length > 0) {
            const urls = await Promise.all(dto.gallery.map(m => this.mediaService.uploadImage(m)));
            domainUpdates.gallery = urls.map(url => new Media(url, MediaType.IMAGE));
        }

        if (dto.priceTiers) {
            domainUpdates.priceTiers = dto.priceTiers.map(p => new Price(
                p.baseAmount, undefined, p.tier, 1, p.maxGuests,
                p.groupDiscountThreshold, p.discountedAmount
            ));
        }

        if (dto.itinerary) {
            domainUpdates.itinerary = dto.itinerary.map(step => new ItineraryStep(
                step.timeSlot ?? "",
                step.title,
                step.durationMinutes,
                step.description,
                step.image ? new Media(step.image.url, step.image.type) : undefined
            ));
        }

        const fields: (keyof UpdateTourRequest)[] = [
            'title', 'overview', 'duration', 'meetingPoint', 'categories',
            'route', 'startTimes', 'highlights', 'accessibilityNotes', 'wheelchairAccessible', 'supportedAllergies'
        ];

        fields.forEach(field => {
            if (dto[field] !== undefined) {
                domainUpdates[field] = dto[field];
            }
        });

        if (dto.introVideoUrl !== undefined) {
            domainUpdates.introVideoUrl = dto.introVideoUrl ?? undefined;
        }

        tour.updateDetails(domainUpdates);
        await this.tourRepo.update(tour);
    }
}