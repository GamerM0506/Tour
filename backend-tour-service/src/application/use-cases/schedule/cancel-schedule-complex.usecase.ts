import { IUnitOfWork } from "src/application/interfaces/unit-of-work";
import { BookingStatus } from "src/domain/enums/booking-status.enum";
import { ScheduleStatus } from "src/domain/enums/schedule-status.enum";
import { CancelBookingUseCase } from "../booking/cancel-booking.usecase";

export class CancelScheduleUseCase {
    constructor(
        private readonly unitOfWork: IUnitOfWork,
        private readonly cancelBookingUseCase: CancelBookingUseCase
    ) { }

    async execute(scheduleId: string): Promise<void> {
        await this.unitOfWork.run(async (tx) => {
            const schedule = await tx.schedules.findById(scheduleId);
            if (!schedule || schedule.status === ScheduleStatus.CANCELLED) return;

            const bookings = await tx.bookings.findByScheduleId(scheduleId);
            for (const booking of bookings) {
                if (booking.status !== BookingStatus.CANCELLED) {
                    await this.cancelBookingUseCase.execute(booking.id);
                }
            }

            schedule.cancel();
            await tx.schedules.update(schedule);
        });
    }
}