import { Type } from "class-transformer";
import { IsUUID, IsNumber, Min, IsString, IsOptional, IsBoolean } from "class-validator";
import { IsFutureDate } from "src/presentation/validators/is-future-date.validator";

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

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    holidaySurcharge?: number;

    @IsString()
    @IsOptional()
    assignedStaff?: string;
}

