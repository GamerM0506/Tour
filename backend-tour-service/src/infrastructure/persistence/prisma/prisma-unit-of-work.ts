import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { PrismaService } from '../../config/prisma.service';
import { PrismaBookingRepository } from './repositories/prisma-booking.repository';
import { PrismaTourScheduleRepository } from './repositories/prisma-tour-schedule.repository';
import { PrismaTourRepository } from './repositories/prisma-tour.repository';

export class PrismaUnitOfWork implements IUnitOfWork {
    constructor(private readonly prisma: PrismaService) { }
    async run<T>(work: (tx: any) => Promise<T>): Promise<T> {
        return await this.prisma.$transaction(async (prismaTx: any) => {
            const repositories = {
                tours: new PrismaTourRepository(prismaTx),
                schedules: new PrismaTourScheduleRepository(prismaTx),
                bookings: new PrismaBookingRepository(prismaTx),
            };
            return await work(repositories);
        });
    }
}