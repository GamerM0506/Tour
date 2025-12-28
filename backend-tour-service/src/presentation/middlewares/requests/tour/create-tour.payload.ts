import {
    IsString, IsNumber, IsArray, Min, IsNotEmpty,
    IsOptional, IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';

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

    @IsNotEmpty()
    @Type(() => Number) 
    @IsNumber()
    baseAmount: number;

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

    @IsOptional()
    @IsArray()
    itinerary?: any[];

    @IsOptional()
    @IsString()
    accessibilityNotes?: string;

    @IsOptional()
    thumbnail?: any;

    @IsOptional()
    gallery?: any[];
}