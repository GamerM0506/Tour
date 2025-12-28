import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { prisma } from '../../config/prisma.service';
import { PrismaBookingRepository } from './repositories/prisma-booking.repository';
import { PrismaTourScheduleRepository } from './repositories/prisma-tour-schedule.repository';
import { PrismaTourRepository } from './repositories/prisma-tour.repository';

export class PrismaUnitOfWork implements IUnitOfWork {
    async run<T>(work: (repos: any) => Promise<T>): Promise<T> {
        return await prisma.$transaction(async (tx) => {
            const repositories = {
                tours: new PrismaTourRepository(tx as any),
                schedules: new PrismaTourScheduleRepository(tx as any),
                bookings: new PrismaBookingRepository(tx as any),
            };
            return await work(repositories);
        });
    }
}