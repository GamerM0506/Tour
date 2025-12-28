import { PartialType } from '@nestjs/mapped-types';
import { CreateTourPayload } from './create-tour.payload';

export class UpdateTourPayload extends PartialType(CreateTourPayload) {}