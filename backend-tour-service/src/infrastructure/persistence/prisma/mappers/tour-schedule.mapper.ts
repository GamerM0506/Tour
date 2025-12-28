import { TourSchedule as PrismaSchedule } from '@prisma/client';
import { TourSchedule } from 'src/domain/entities/tour-schedule.entity';
import { ScheduleStatus } from 'src/domain/enums/schedule-status.enum';

export class TourScheduleMapper {
    static toDomain(raw: PrismaSchedule): TourSchedule {
        return new TourSchedule(
            raw.tourId,
            raw.startTime,
            raw.maxCapacity,
            raw.timeZone,
            raw.currentBookings,
            raw.status as ScheduleStatus,
            raw.assignedStaff || undefined,
            raw.isHoliday,
            raw.id
        );
    }

    static toPersistence(entity: TourSchedule): any {
        return {
            id: entity.id,
            tourId: entity.tourId,
            startTime: entity.startTime,
            maxCapacity: entity.maxCapacity,
            timeZone: entity.timeZone,
            currentBookings: (entity as any)._currentBookings,
            status: entity.status,
            assignedStaff: entity.assignedStaff,
            isHoliday: entity.isHoliday,
            deletedAt: entity.deletedAt
        };
    }
}