import { Tour } from '../entities/tour.entity';

export interface ITourRepository {
    findAll(): Promise<Tour[]>;
    findById(id: string): Promise<Tour | null>;
    search(query: string): Promise<Tour[]>;
}