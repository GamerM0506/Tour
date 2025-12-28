import { ITourScheduleRepository } from 'src/domain/repositories/tour-schedule.repository';
import { TourSchedule } from 'src/domain/entities/tour-schedule.entity';
import { TourScheduleMapper } from '../mappers/tour-schedule.mapper';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../config/prisma.service';

export class PrismaTourScheduleRepository implements ITourScheduleRepository {
    constructor(private readonly client: PrismaClient = prisma) { }

    async findAvailableSchedules(tourId: string, startDate: Date): Promise<TourSchedule[]> {
        const raws = await this.client.tourSchedule.findMany({
            where: {
                tourId: tourId,
                startTime: { gte: startDate },
                status: 'available',
            },
            orderBy: { startTime: 'asc' }
        });
        return raws.map(raw => TourScheduleMapper.toDomain(raw));
    }

    async findAll(): Promise<TourSchedule[]> {
        const raws = await this.client.tourSchedule.findMany();
        return raws.map(raw => TourScheduleMapper.toDomain(raw));
    }

    async softDelete(id: string): Promise<void> {
        await this.client.tourSchedule.update({
            where: { id },
            data: { status: 'cancelled' }
        });
    }

    async findByIdWithLock(id: string): Promise<TourSchedule | null> {
        const raw: any[] = await (this.client as any).$queryRaw`
            SELECT * FROM "TourSchedule" 
            WHERE "id" = ${id}
            FOR UPDATE
        `;

        if (raw.length === 0) return null;
        return TourScheduleMapper.toDomain(raw[0]);
    }

    async save(entity: TourSchedule): Promise<void> {
        const data = TourScheduleMapper.toPersistence(entity);
        await this.client.tourSchedule.create({ data });
    }

    async update(entity: TourSchedule): Promise<void> {
        const data = TourScheduleMapper.toPersistence(entity);
        await this.client.tourSchedule.update({
            where: { id: entity.id },
            data: data
        });
    }

    async findById(id: string): Promise<TourSchedule | null> {
        const raw = await this.client.tourSchedule.findUnique({ where: { id } });
        return raw ? TourScheduleMapper.toDomain(raw) : null;
    }
}