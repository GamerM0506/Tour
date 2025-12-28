import { TourNotFoundException } from "src/domain/exceptions/tour.exception";
import { ITourRepository } from "src/domain/repositories/tour.repository";

export class DeleteTourUseCase {
    constructor(private readonly tourRepo: ITourRepository) { }

    async execute(id: string): Promise<void> {
        const tour = await this.tourRepo.findById(id);
        if (!tour) throw new TourNotFoundException();
        
        tour.softDelete();
        await this.tourRepo.update(tour);
    }
}