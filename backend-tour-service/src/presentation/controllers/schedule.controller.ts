import { Controller, Post, Body, Get, Query, Param, Delete, Patch } from '@nestjs/common';
import { CreateScheduleUseCase } from 'src/application/use-cases/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from 'src/application/use-cases/schedule/update-schedule.usecase';
import { CancelScheduleUseCase } from 'src/application/use-cases/schedule/cancel-schedule-complex.usecase';
import { CreateSchedulePayload } from '../middlewares/requests/schedule/create-schedule.payload';
import { CreateScheduleRequest } from 'src/application/dtos/schedule/requests/create-schedule.request';

@Controller('schedules')
export class ScheduleController {
    constructor(
        private readonly createScheduleUseCase: CreateScheduleUseCase,
        private readonly updateScheduleUseCase: UpdateScheduleUseCase,
        private readonly cancelScheduleUseCase: CancelScheduleUseCase
    ) { }

    @Post()
    async create(@Body() payload: CreateSchedulePayload) {
        const request: CreateScheduleRequest = {
            tourId: payload.tourId,
            startTime: new Date(payload.startDate),
            maxCapacity: payload.maxSlots,
            timeZone: payload.timeZone || 'UTC',
            isHoliday: payload.isHoliday ?? false,
            assignedStaff: payload.assignedStaff
        };

        return await this.createScheduleUseCase.execute(request);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.cancelScheduleUseCase.execute(id);
    }
}