import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingPayload } from '../booking/create-booking.payload';

export class UpdateSchedulePayload extends PartialType(CreateBookingPayload) {}