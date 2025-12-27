import { IBookingRepository } from '../../domain/repositories/booking.repository';
import { ITourScheduleRepository } from '../../domain/repositories/tour-schedule.repository';

export interface IUnitOfWork {
    run<T>(work: (repositories: {
        bookings: IBookingRepository,
        schedules: ITourScheduleRepository
    }) => Promise<T>): Promise<T>;
}