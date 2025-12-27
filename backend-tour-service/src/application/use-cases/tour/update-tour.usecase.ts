import { UpdateTourRequest } from "src/application/dtos/tour/requests/update-tour.request";
import { IMediaService } from "src/application/interfaces/IMediaService";
import { ITourRepository } from "src/domain/repositories/tour.repository";
import { Price } from "src/domain/value-objects/price.vo";
import { MediaType } from "src/domain/enums/mediatype.enum";
import { Media } from "src/domain/value-objects/media.vo";

export class UpdateTourUseCase {
    constructor(
        private readonly tourRepo: ITourRepository,
        private readonly mediaService: IMediaService
    ) { }

    async execute(id: string, dto: UpdateTourRequest): Promise<void> {
        const tour = await this.tourRepo.findById(id);
        if (!tour || tour.isDeleted) throw new Error("Tour not found.");
        if (dto.thumbnail) {
            const thumbnailUrl = await this.mediaService.uploadImage(dto.thumbnail);
            (tour as any).thumbnail = new Media(thumbnailUrl, MediaType.IMAGE, tour.title, tour.title, true);
        }
        if (dto.gallery && dto.gallery.length > 0) {
            const galleryUrls = await Promise.all(
                dto.gallery.map(file => this.mediaService.uploadImage(file))
            );
            (tour as any).gallery = galleryUrls.map(url => new Media(url, MediaType.IMAGE));
        }
        (tour as any).title = dto.title ?? tour.title;
        (tour as any).overview = dto.overview ?? tour.overview;
        (tour as any).duration = dto.duration ?? tour.duration;
        (tour as any).meetingPoint = dto.meetingPoint ?? tour.meetingPoint;
        (tour as any).route = dto.route ?? tour.route;
        if (dto.baseAmount) {
            (tour as any).price = new Price(dto.baseAmount);
        }
        if (dto.categories) (tour as any).categories = dto.categories;
        if (dto.highlights) (tour as any).highlights = dto.highlights;
        if (dto.itinerary) (tour as any).itinerary = dto.itinerary;
        await this.tourRepo.update(tour);
    }
}