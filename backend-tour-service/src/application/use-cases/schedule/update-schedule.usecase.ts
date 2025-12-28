import { UpdateScheduleRequest } from "src/application/dtos/schedule/requests/update-schedule.request";
import { ScheduleNotFoundException } from "src/domain/exceptions/schedule.exception";
import { ITourScheduleRepository } from "src/domain/repositories/tour-schedule.repository";

export class UpdateScheduleUseCase {
    constructor(private readonly scheduleRepo: ITourScheduleRepository) { }

    async execute(id: string, dto: UpdateScheduleRequest): Promise<void> {
        const schedule = await this.scheduleRepo.findById(id);
        if (!schedule) throw new ScheduleNotFoundException();
        if (dto.assignedStaff !== undefined) (schedule as any).assignedStaff = dto.assignedStaff;
        if (dto.status) schedule.status = dto.status;
        if (dto.isHoliday !== undefined) (schedule as any).isHoliday = dto.isHoliday;
        if (dto.startTime) (schedule as any).startTime = dto.startTime;
        if (dto.maxCapacity) (schedule as any).maxCapacity = dto.maxCapacity;
        await this.scheduleRepo.update(schedule);
    }
}