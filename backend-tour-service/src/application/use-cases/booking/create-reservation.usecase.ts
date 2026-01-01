import { CreateBookingRequest } from 'src/application/dtos/booking/requests/create-booking.request';
import { BookingResponse } from 'src/application/dtos/booking/responses/booking.response';
import { Booking } from 'src/domain/entities/booking.entity';
import { IUnitOfWork } from 'src/application/interfaces/unit-of-work';
import { BookingCapacityExceededException } from 'src/domain/exceptions/booking.exception';
import { ScheduleNotFoundException } from 'src/domain/exceptions/schedule.exception';
import { TourNotFoundException } from 'src/domain/exceptions/tour.exception';

export class CreateReservationUseCase {
    constructor(
        private readonly unitOfWork: IUnitOfWork,
    ) { }

    async execute(dto: CreateBookingRequest): Promise<BookingResponse> {
        return await this.unitOfWork.run(async (tx) => {
            const schedule = await tx.schedules.findByIdWithLock(dto.scheduleId);
            if (!schedule || schedule.isDeleted) throw new ScheduleNotFoundException();

            const tour = await tx.tours.findById(schedule.tourId);
            if (!tour) throw new TourNotFoundException();

            tour.validateGuestRequirements(dto.needsWheelchair, dto.allergies);

            const selectedPrice = tour.getPriceTier(dto.selectedTierName);


            const totalPax = dto.adultsCount + dto.childrenCount + dto.infantsCount;
            if (!schedule.hasEnoughSlots(totalPax)) {
                throw new BookingCapacityExceededException();
            }

            const under12s = dto.childrenCount + dto.infantsCount;

            const baseTotal = tour.calculateTotalPrice(
                dto.selectedTierName,
                dto.adultsCount,
                dto.childrenCount,
                dto.infantsCount
            );

            const holidaySurcharge = schedule.calculateTotalSurcharge(dto.adultsCount, under12s);
            const finalTotal = baseTotal + holidaySurcharge;

            schedule.addBooking(totalPax);

            const booking = new Booking(
                schedule.id,
                dto.contactEmail,
                dto.contactPhone,
                dto.guestName,
                dto.guestEmail,
                dto.guestPhone,
                dto.adultsCount,
                dto.childrenCount,
                dto.infantsCount,
                dto.selectedTierName,
                finalTotal,
                schedule.startTime,
                dto.allergies,
                dto.needsWheelchair,
                dto.customerNote
            );

            await tx.bookings.save(booking);

            const expiresAt = new Date(booking.createdAt.getTime() + 15 * 60 * 1000);

            return {
                id: booking.id,
                status: booking.status,
                totalPrice: booking.totalPrice,
                currency: selectedPrice.currency,
                paymentStatus: booking.paymentStatus,
                tourStartTime: booking.tourStartTime,
                expiresAt: expiresAt,
                guestSummary: {
                    adults: dto.adultsCount,
                    children: dto.childrenCount,
                    infants: dto.infantsCount
                }
            };
        });
    }
}