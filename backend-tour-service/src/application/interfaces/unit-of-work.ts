import { IBookingRepository } from 'src/domain/repositories/booking.repository';
import { ITourScheduleRepository } from 'src/domain/repositories/tour-schedule.repository';
import { ITourRepository } from '../../domain/repositories/tour.repository';

export interface IUnitOfWork {
    run<T>(work: (repositories: {
        bookings: IBookingRepository,
        schedules: ITourScheduleRepository,
        tours: ITourRepository 
    }) => Promise<T>): Promise<T>;
}