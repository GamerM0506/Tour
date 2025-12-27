import { IGenericRepository } from './base/generic.repository';
import { Tour } from '../entities/tour.entity';

export interface ITourRepository extends IGenericRepository<Tour> {
    findByCategory(category: string): Promise<Tour[]>;
    findFeaturedTours(): Promise<Tour[]>;
}