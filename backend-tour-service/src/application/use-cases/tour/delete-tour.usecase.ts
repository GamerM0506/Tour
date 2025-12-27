import { ITourRepository } from "src/domain/repositories/tour.repository";

export class DeleteTourUseCase {
    constructor(private readonly tourRepo: ITourRepository) { }

    async execute(id: string): Promise<void> {
        const tour = await this.tourRepo.findById(id);
        if (!tour) throw new Error("Tour not found.");
        tour.softDelete();
        await this.tourRepo.update(tour);
    }
}