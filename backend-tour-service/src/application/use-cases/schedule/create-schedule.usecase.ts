import { ITourRepository } from "src/domain/repositories/tour.repository";
import { ITourScheduleRepository } from "src/domain/repositories/tour-schedule.repository";
import { ScheduleResponse } from "src/application/dtos/schedule/responses/schedule.response";
import { CreateScheduleRequest } from "src/application/dtos/schedule/requests/create-schedule.request";
import { TourSchedule } from "src/domain/entities/tour-schedule.entity";
import { ScheduleStatus } from "src/domain/enums/schedule-status.enum";
import { ScheduleNotFoundException } from "src/domain/exceptions/schedule.exception";

export class CreateScheduleUseCase {
    constructor(
        private readonly scheduleRepo: ITourScheduleRepository,
        private readonly tourRepo: ITourRepository
    ) { }

    async execute(dto: CreateScheduleRequest): Promise<ScheduleResponse> {
        const tour = await this.tourRepo.findById(dto.tourId);
        if (!tour) throw new ScheduleNotFoundException();

        const schedule = new TourSchedule(
            dto.tourId,
            dto.startTime,
            dto.maxCapacity,
            dto.timeZone,
            0,
            ScheduleStatus.AVAILABLE,
            dto.assignedStaff,
            dto.isHoliday
        );

        await this.scheduleRepo.save(schedule);

        return {
            id: schedule.id,
            startTime: schedule.startTime,
            remainingSlots: schedule.remainingSlots,
            status: schedule.status,
            isHoliday: schedule.isHoliday,
            finalPrice: schedule.getFinalPrice(tour.price)
        };
    }
}