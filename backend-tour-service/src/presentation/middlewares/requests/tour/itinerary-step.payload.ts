import { IsString, IsNumber, IsNotEmpty, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItineraryStepPayload {
    @IsString() @IsNotEmpty()
    title: string;

    @IsString() @IsNotEmpty()
    description: string;

    @IsOptional() @IsString()
    timeSlot?: string;

    @IsNumber() @Type(() => Number)
    durationMinutes: number;
}