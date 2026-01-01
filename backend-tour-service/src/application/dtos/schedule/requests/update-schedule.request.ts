import { ScheduleStatus } from "src/domain/enums/schedule-status.enum";

export class UpdateScheduleRequest {
    startTime?: Date;
    maxCapacity?: number;
    timeZone?: string;
    status?: ScheduleStatus;
    assignedStaff?: string | null;
    isHoliday?: boolean;
    holidaySurcharge?: number;
}