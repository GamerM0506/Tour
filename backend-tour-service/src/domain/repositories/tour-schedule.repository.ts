import { IGenericRepository } from './base/generic.repository';
import { TourSchedule } from '../entities/tour-schedule.entity';

export interface ITourScheduleRepository extends IGenericRepository<TourSchedule> {
    findByIdWithLock(id: string): Promise<TourSchedule | null>;
    findAvailableSchedules(tourId: string, startDate: Date): Promise<TourSchedule[]>;
}