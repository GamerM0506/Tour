import { PartialType } from '@nestjs/mapped-types';
import { CreateSchedulePayload } from './create-schedule.payload';

export class UpdateSchedulePayload extends PartialType(CreateSchedulePayload) { }