import { ITourRepository } from 'src/domain/repositories/tour.repository';
import { Tour } from 'src/domain/entities/tour.entity';
import { prisma } from '../../../config/prisma.service';
import { TourMapper } from '../mappers/tour.mapper';
import { PrismaClient } from '@prisma/client';

export class PrismaTourRepository implements ITourRepository {
    constructor(private readonly client: PrismaClient = prisma) { }

    async findByCategory(category: string): Promise<Tour[]> {
        const raws = await this.client.tour.findMany({
            where: {
                categories: { has: category },
                deletedAt: null
            }
        });
        return raws.map(raw => TourMapper.toDomain(raw as any));
    }

    async findFeaturedTours(): Promise<Tour[]> {
        const raws = await this.client.tour.findMany({
            where: { deletedAt: null },
            take: 10,
            orderBy: { createdAt: 'desc' }
        });
        return raws.map(raw => TourMapper.toDomain(raw as any));
    }

    async findById(id: string): Promise<Tour | null> {
        const raw = await this.client.tour.findUnique({
            where: { id, deletedAt: null }
        });
        return raw ? TourMapper.toDomain(raw as any) : null;
    }

    async save(entity: Tour): Promise<void> {
        const data = TourMapper.toPersistence(entity);
        await this.client.tour.create({ data });
    }

    async update(entity: Tour): Promise<void> {
        const data = TourMapper.toPersistence(entity);
        await this.client.tour.update({
            where: { id: entity.id },
            data: data
        });
    }

    async findAll(): Promise<Tour[]> {
        const raws = await this.client.tour.findMany({ where: { deletedAt: null } });
        return raws.map(raw => TourMapper.toDomain(raw as any));
    }

    async softDelete(id: string): Promise<void> {
        await this.client.tour.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}