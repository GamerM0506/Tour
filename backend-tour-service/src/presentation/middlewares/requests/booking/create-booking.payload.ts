import { IsString, IsNumber, IsEmail, IsOptional, IsBoolean, IsArray, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingPayload {
    @IsUUID('4')
    scheduleId: string;

    @IsEmail()
    contactEmail: string;

    @IsString()
    contactPhone: string;

    @IsString()
    guestName: string;

    @IsEmail()
    guestEmail: string;

    @IsString()
    guestPhone: string;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    numberOfGuests: number;

    @IsOptional()
    @IsString()
    customerNote?: string;

    @IsBoolean()
    @Type(() => Boolean)
    needsWheelchair: boolean;

    @IsArray()
    @IsString({ each: true })
    allergies: string[];
}