import { Module } from '@nestjs/common';
import { TourModule } from './infrastructure/ioc/tour.module';
import { BookingModule } from './infrastructure/ioc/booking.module';
import { ScheduleModule } from './infrastructure/ioc/schedule.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TourModule,
    BookingModule,
    ScheduleModule,
  ],
})
export class AppModule { }