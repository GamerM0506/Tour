import { Booking } from '../entities/booking.entity';

export interface IBookingRepository {
    create(tourId: string, scheduleId: string, guests: number): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    cancel(id: string): Promise<void>;
}