import { Module } from '@nestjs/common';
import { CreateScheduleUseCase } from "src/application/use-cases/schedule/create-schedule.usecase";
import { ScheduleController } from "src/presentation/controllers/schedule.controller";
import { PrismaService } from "../config/prisma.service";
import { UpdateScheduleUseCase } from "src/application/use-cases/schedule/update-schedule.usecase";
import { CancelScheduleUseCase } from "src/application/use-cases/schedule/cancel-schedule-complex.usecase";
import { PrismaTourScheduleRepository } from "../persistence/prisma/repositories/prisma-tour-schedule.repository";
import { PrismaTourRepository } from "../persistence/prisma/repositories/prisma-tour.repository";

@Module({
  controllers: [ScheduleController],
  providers: [
    PrismaService,
    CreateScheduleUseCase,
    UpdateScheduleUseCase,
    CancelScheduleUseCase,
    { provide: 'ITourScheduleRepository', useClass: PrismaTourScheduleRepository },
    { provide: 'ITourRepository', useClass: PrismaTourRepository },
  ],
})
export class ScheduleModule {}