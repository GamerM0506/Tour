// src/infrastructure/modules/booking.module.ts

import { Module } from '@nestjs/common';
import { BookingController } from 'src/presentation/controllers/booking.controller';
import { CreateReservationUseCase } from 'src/application/use-cases/booking/create-reservation.usecase';
import { ConfirmPaymentUseCase } from 'src/application/use-cases/booking/confirm-payment.usecase';
import { CancelBookingUseCase } from 'src/application/use-cases/booking/cancel-booking.usecase';
import { PrismaUnitOfWork } from '../persistence/prisma/prisma-unit-of-work';
import { StripeService } from '../services/stripe.service';
import { PrismaBookingRepository } from '../persistence/prisma/repositories/prisma-booking.repository';
import { TourModule } from './tour.module';
import { ScheduleModule } from './schedule.module';

@Module({
  imports: [
    TourModule,
    ScheduleModule,
  ],
  controllers: [BookingController],
  providers: [
    CreateReservationUseCase,
    ConfirmPaymentUseCase,
    CancelBookingUseCase,
    { provide: 'IUnitOfWork', useClass: PrismaUnitOfWork },
    { provide: 'IBookingRepository', useClass: PrismaBookingRepository },
    { provide: 'IStripeService', useClass: StripeService },
    StripeService,
  ],
})
export class BookingModule { }