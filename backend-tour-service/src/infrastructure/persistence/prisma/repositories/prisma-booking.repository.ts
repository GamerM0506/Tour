import { IBookingRepository } from 'src/domain/repositories/booking.repository';
import { Booking } from 'src/domain/entities/booking.entity';
import { BookingMapper } from '../mappers/booking.mapper';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../config/prisma.service';

export class PrismaBookingRepository implements IBookingRepository {
    constructor(private readonly client: PrismaClient = prisma) { }

    async findByScheduleId(scheduleId: string): Promise<Booking[]> {
        const raws = await this.client.booking.findMany({
            where: {
                scheduleId: scheduleId,
                deletedAt: null
            }
        });
        return raws.map(raw => BookingMapper.toDomain(raw));
    }

    async findAll(): Promise<Booking[]> {
        const raws = await this.client.booking.findMany({
            where: { deletedAt: null }
        });
        return raws.map(raw => BookingMapper.toDomain(raw));
    }

    async softDelete(id: string): Promise<void> {
        await this.client.booking.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    async save(entity: Booking): Promise<void> {
        const data = BookingMapper.toPersistence(entity);
        await this.client.booking.create({ data });
    }

    async findById(id: string): Promise<Booking | null> {
        const raw = await this.client.booking.findUnique({ where: { id } });
        return raw ? BookingMapper.toDomain(raw) : null;
    }

    async update(entity: Booking): Promise<void> {
        const data = BookingMapper.toPersistence(entity);
        await this.client.booking.update({
            where: { id: entity.id },
            data: data
        });
    }

    async findByPaymentIntentId(paymentIntentId: string): Promise<Booking | null> {
        const raw = await this.client.booking.findFirst({
            where: { stripePaymentIntentId: paymentIntentId, deletedAt: null }
        });
        return raw ? BookingMapper.toDomain(raw) : null;
    }

    async findExpiredBookings(threshold: Date): Promise<Booking[]> {
        const raws = await this.client.booking.findMany({
            where: {
                status: 'pending',
                paymentStatus: 'unpaid',
                createdAt: { lt: threshold },
                deletedAt: null
            }
        });
        return raws.map(raw => BookingMapper.toDomain(raw));
    }
}