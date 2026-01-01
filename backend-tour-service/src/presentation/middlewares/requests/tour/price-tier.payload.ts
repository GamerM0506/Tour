import { IsString, IsNumber, IsNotEmpty, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PriceTierPayload {
    @IsString() @IsNotEmpty()
    tier: string; 

    @IsNumber() @Min(0) @Type(() => Number)
    baseAmount: number;

    @IsNumber() @Min(1) @Type(() => Number)
    maxGuests: number;

    @IsOptional() @IsNumber() @Min(0) @Type(() => Number)
    discountedAmount?: number;
}