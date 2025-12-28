import {
    Controller, Post, Body, Get, Param, Patch, Delete,
    UseInterceptors, UploadedFiles, Query
} from '@nestjs/common';
import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTourUseCase } from 'src/application/use-cases/tour/create-tour.usecase';
import { UpdateTourUseCase } from 'src/application/use-cases/tour/update-tour.usecase';
import { DeleteTourUseCase } from 'src/application/use-cases/tour/delete-tour.usecase';
import { CreateTourRequest } from 'src/application/dtos/tour/requests/create-tour.request';
import { UpdateTourRequest } from 'src/application/dtos/tour/requests/update-tour.request';
import { CreateTourPayload } from '../middlewares/requests/tour/create-tour.payload';
import { UpdateTourPayload } from '../middlewares/requests/tour/update-tour.payload';

@Controller('tours')
export class TourController {
    constructor(
        private readonly createTourUseCase: CreateTourUseCase,
        private readonly updateTourUseCase: UpdateTourUseCase,
        private readonly deleteTourUseCase: DeleteTourUseCase
    ) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]))
    async create(
        @Body() body: CreateTourPayload,
        @UploadedFiles() files: { thumbnail?: any[], gallery?: any[] }
    ) {
        const dto: CreateTourRequest = {
            ...body,
            wheelchairAccessible: body.wheelchairAccessible ?? false,
            supportedAllergies: body.supportedAllergies || [],
            itinerary: body.itinerary || [],
            highlights: body.highlights || [],
            startTimes: body.startTimes || [],
            route: body.route || '',
            accessibilityNotes: body.accessibilityNotes || [],
            thumbnail: files.thumbnail?.[0],
            gallery: files.gallery || [],
        } as CreateTourRequest;

        return await this.createTourUseCase.execute(dto);
    }

    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]))
    async update(
        @Param('id') id: string,
        @Body() body: UpdateTourPayload,
        @UploadedFiles() files: { thumbnail?: any[], gallery?: any[] }
    ) {
        const dto: UpdateTourRequest = {
            ...body,
            thumbnail: files.thumbnail?.[0],
            gallery: files.gallery
        } as UpdateTourRequest;

        return await this.updateTourUseCase.execute(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.deleteTourUseCase.execute(id);
    }
}