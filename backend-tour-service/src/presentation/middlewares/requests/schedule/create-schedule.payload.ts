import { IsNumber, Min, IsUUID, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { IsFutureDate } from 'src/presentation/validators/is-future-date.validator';

export class CreateSchedulePayload {
    @IsUUID('4')
    tourId: string;

    @IsFutureDate()
    startDate: string;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    maxSlots: number;

    @IsString()
    @IsOptional()
    timeZone?: string;

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isHoliday?: boolean;

    @IsString()
    @IsOptional()
    assignedStaff?: string;
}