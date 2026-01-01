import { Module } from '@nestjs/common';
import { TourController } from 'src/presentation/controllers/tour.controller';
import { CreateTourUseCase } from 'src/application/use-cases/tour/create-tour.usecase';
import { UpdateTourUseCase } from 'src/application/use-cases/tour/update-tour.usecase';
import { DeleteTourUseCase } from 'src/application/use-cases/tour/delete-tour.usecase';
import { PrismaTourRepository } from '../persistence/prisma/repositories/prisma-tour.repository';
import { CloudinaryService } from '../services/cloudinary.service';

@Module({
    controllers: [TourController],
    providers: [
        CreateTourUseCase,
        UpdateTourUseCase,
        DeleteTourUseCase,
        {
            provide: 'ITourRepository',
            useClass: PrismaTourRepository,
        },
        {
            provide: 'IMediaService',
            useClass: CloudinaryService,
        },
    ],
    exports: ['ITourRepository'],
})
export class TourModule { }