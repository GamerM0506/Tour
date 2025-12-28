import { TourSchedule } from '../entities/tour-schedule.entity';

export interface IScheduleRepository {
    findByTourId(tourId: string): Promise<TourSchedule[]>;
    findById(id: string): Promise<TourSchedule | null>;
}