import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateSchedulePayload } from './create-schedule.payload';
import { IsString, IsOptional } from 'class-validator';

export class UpdateSchedulePayload extends PartialType(
    OmitType(CreateSchedulePayload, ['assignedStaff'] as const)
) {
    @IsOptional()
    @IsString()
    assignedStaff?: string | null;
}