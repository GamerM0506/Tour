import { IGenericRepository } from './base/generic.repository';
import { Booking } from '../entities/booking.entity';

export interface IBookingRepository extends IGenericRepository<Booking> {
    findByPaymentIntentId(paymentIntentId: string): Promise<Booking | null>;
    findExpiredBookings(threshold: Date): Promise<Booking[]>;
    findByScheduleId(scheduleId: string): Promise<Booking[]>;
}