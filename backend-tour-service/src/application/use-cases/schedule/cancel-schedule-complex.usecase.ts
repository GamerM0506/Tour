import { IBookingRepository } from "src/domain/repositories/booking.repository";
import { CancelBookingUseCase } from "../booking/cancel-booking.usecase";
import { ITourScheduleRepository } from "src/domain/repositories/tour-schedule.repository";
import { ScheduleStatus } from "src/domain/enums/schedule-status.enum";
import { BookingStatus } from "src/domain/enums/booking-status.enum";

export class CancelScheduleUseCase {
    constructor(
        private readonly scheduleRepo: ITourScheduleRepository,
        private readonly bookingRepo: IBookingRepository,
        private readonly cancelBookingUseCase: CancelBookingUseCase
    ) { }

    async execute(scheduleId: string): Promise<void> {
        const schedule = await this.scheduleRepo.findById(scheduleId);
        if (!schedule) return;

        const bookings = await this.bookingRepo.findByScheduleId(scheduleId);

        for (const booking of bookings) {
            if (booking.status !== BookingStatus.CANCELLED) {
                await this.cancelBookingUseCase.execute(booking.id);
            }
        }

        schedule.status = ScheduleStatus.CANCELLED;
        schedule.softDelete();
        await this.scheduleRepo.update(schedule);
    }
}