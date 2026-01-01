// src/infrastructure/modules/schedule.module.ts

import { Module } from '@nestjs/common';
import { CreateScheduleUseCase } from "src/application/use-cases/schedule/create-schedule.usecase";
import { ScheduleController } from "src/presentation/controllers/schedule.controller";
import { UpdateScheduleUseCase } from "src/application/use-cases/schedule/update-schedule.usecase";
import { CancelScheduleUseCase } from "src/application/use-cases/schedule/cancel-schedule-complex.usecase";
import { PrismaTourScheduleRepository } from "../persistence/prisma/repositories/prisma-tour-schedule.repository";
import { TourModule } from './tour.module';

@Module({
  imports: [
    TourModule,
  ],
  controllers: [ScheduleController],
  providers: [
    CreateScheduleUseCase,
    UpdateScheduleUseCase,
    CancelScheduleUseCase,
    {
      provide: 'ITourScheduleRepository',
      useClass: PrismaTourScheduleRepository
    },
  ],
  exports: ['ITourScheduleRepository'],
})
export class ScheduleModule { }