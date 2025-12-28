import { ITourRepository } from 'src/domain/repositories/tour.repository';
import { CreateBookingRequest } from 'src/application/dtos/booking/requests/create-booking.request';
import { BookingResponse } from 'src/application/dtos/booking/responses/booking.response';
import { Booking } from 'src/domain/entities/booking.entity';
import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { BookingCapacityExceededException } from 'src/domain/exceptions/booking.exception';
import { ScheduleNotFoundException } from 'src/domain/exceptions/schedule.exception';
import { TourNotFoundException } from 'src/domain/exceptions/tour.exception';

export class CreateReservationUseCase {
    constructor(
        private readonly tourRepo: ITourRepository,
        private readonly unitOfWork: IUnitOfWork,
    ) { }

    async execute(dto: CreateBookingRequest): Promise<BookingResponse> {
        return await this.unitOfWork.run(async (tx) => {
            const schedule = await tx.schedules.findByIdWithLock(dto.scheduleId);
            if (!schedule || schedule.isDeleted) throw new ScheduleNotFoundException();

            const tour = await this.tourRepo.findById(schedule.tourId);
            if (!tour) throw new TourNotFoundException();

            tour.validateGuestRequirements(dto.needsWheelchair, dto.allergies);
            if (!schedule.hasEnoughSlots(dto.numberOfGuests)) {
                throw new BookingCapacityExceededException();
            }

            const finalPricePerPerson = schedule.getFinalPrice(tour.price);
            const totalAmount = finalPricePerPerson * dto.numberOfGuests;
            const booking = new Booking(
                schedule.id,
                dto.contactEmail,
                dto.contactPhone,
                dto.guestName,
                dto.guestEmail,
                dto.guestPhone,
                dto.customerNote || "",
                dto.numberOfGuests,
                totalAmount,
                schedule.startTime
            );
            await tx.bookings.save(booking);
            const expiresAt = new Date(booking.createdAt.getTime() + 15 * 60 * 1000);
            return {
                id: booking.id,
                status: booking.status,
                totalPrice: booking.totalPrice,
                paymentStatus: booking.paymentStatus,
                tourStartTime: booking.tourStartTime,
                expiresAt: expiresAt
            };
        });
    }
}