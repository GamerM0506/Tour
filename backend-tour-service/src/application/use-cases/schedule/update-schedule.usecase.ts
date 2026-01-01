import { UpdateScheduleRequest } from "src/application/dtos/schedule/requests/update-schedule.request";
import { ScheduleNotFoundException } from "src/domain/exceptions/schedule.exception";
import { ITourScheduleRepository } from "src/domain/repositories/tour-schedule.repository";

export class UpdateScheduleUseCase {
    constructor(private readonly scheduleRepo: ITourScheduleRepository) { }

    async execute(id: string, dto: UpdateScheduleRequest): Promise<void> {
        const schedule = await this.scheduleRepo.findById(id);
        if (!schedule) throw new ScheduleNotFoundException();
        const domainUpdates = {
            ...dto,
            assignedStaff: dto.assignedStaff ?? undefined
        };

        schedule.updateDetails(domainUpdates);

        await this.scheduleRepo.update(schedule);
    }
}