import { Module } from '@nestjs/common';
import { BookingController } from 'src/presentation/controllers/booking.controller';
import { CreateReservationUseCase } from 'src/application/use-cases/booking/create-reservation.usecase';
import { ConfirmPaymentUseCase } from 'src/application/use-cases/booking/confirm-payment.usecase';
import { CancelBookingUseCase } from 'src/application/use-cases/booking/cancel-booking.usecase';
import { PrismaUnitOfWork } from '../persistence/prisma/prisma-unit-of-work';
import { PrismaService } from '../config/prisma.service';
import { StripeService } from '../services/stripe.service';
import { PrismaBookingRepository } from '../persistence/prisma/repositories/prisma-booking.repository';
import { PrismaTourScheduleRepository } from "../persistence/prisma/repositories/prisma-tour-schedule.repository";
import { PrismaTourRepository } from '../persistence/prisma/repositories/prisma-tour.repository';

@Module({
  controllers: [BookingController],
  providers: [
    PrismaService,
    CreateReservationUseCase,
    ConfirmPaymentUseCase,
    CancelBookingUseCase,
    StripeService, 
    { provide: 'IUnitOfWork', useClass: PrismaUnitOfWork },
    { provide: 'IBookingRepository', useClass: PrismaBookingRepository },
    { provide: 'ITourScheduleRepository', useClass: PrismaTourScheduleRepository },
    { provide: 'ITourRepository', useClass: PrismaTourRepository },
    { provide: 'IStripeService', useClass: StripeService },
  ],
})
export class BookingModule {}