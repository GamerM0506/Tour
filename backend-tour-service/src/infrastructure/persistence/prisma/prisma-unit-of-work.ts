import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { PrismaService } from '../../config/prisma.service';
import { PrismaBookingRepository } from './repositories/prisma-booking.repository';
import { PrismaTourScheduleRepository } from './repositories/prisma-tour-schedule.repository';
import { PrismaTourRepository } from './repositories/prisma-tour.repository';
import { IBookingRepository } from 'src/domain/repositories/booking.repository';
import { ITourScheduleRepository } from 'src/domain/repositories/tour-schedule.repository';
import { ITourRepository } from 'src/domain/repositories/tour.repository';

export type UnitOfWorkRepositories = {
    tours: ITourRepository;
    schedules: ITourScheduleRepository;
    bookings: IBookingRepository;
};

export class PrismaUnitOfWork implements IUnitOfWork {
    constructor(private readonly prisma: PrismaService) { }

    async run<T>(work: (repos: UnitOfWorkRepositories) => Promise<T>): Promise<T> {
        return await this.prisma.$transaction(async (prismaTx) => {
            const repositories: UnitOfWorkRepositories = {
                tours: new PrismaTourRepository(prismaTx as any),
                schedules: new PrismaTourScheduleRepository(prismaTx as any),
                bookings: new PrismaBookingRepository(prismaTx as any),
            };
            return await work(repositories);
        });
    }
}