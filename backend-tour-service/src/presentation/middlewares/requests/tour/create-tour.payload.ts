import {
    IsString, IsNumber, IsArray, Min, IsNotEmpty,
    IsOptional, IsBoolean,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { PriceTierPayload } from './price-tier.payload';
import { ItineraryStepPayload } from './itinerary-step.payload';

export class CreateTourPayload {
    @IsString()
    @IsNotEmpty({ message: 'The tour title must not be left blank' })
    title: string;

    @IsString()
    @IsNotEmpty()
    overview: string;

    @IsString()
    duration: string;

    @IsString()
    meetingPoint: string;

    @IsArray()
    @IsString({ each: true })
    categories: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PriceTierPayload)
    priceTiers: PriceTierPayload[];

    @IsString()
    currency: string;

    @IsOptional()
    @IsString()
    route?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    startTimes?: string[];

    @IsNotEmpty()
    @Type(() => Boolean) 
    @IsBoolean()
    wheelchairAccessible: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    supportedAllergies?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    highlights?: string[];

    @IsOptional() @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItineraryStepPayload)
    itinerary?: ItineraryStepPayload[];

    @IsOptional()
    @IsString()
    accessibilityNotes?: string;

    @IsOptional()
    thumbnail?: any;

    @IsOptional()
    gallery?: any[];
}