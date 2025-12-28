import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RawBodyMiddleware } from './presentation/middlewares/raw-body.middleware';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './infrastructure/ioc/booking.module';
import { ScheduleModule } from './infrastructure/ioc/schedule.module';
import { TourModule } from './infrastructure/ioc/tour.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TourModule,
    BookingModule,
    ScheduleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes('bookings/webhook');
  }
}