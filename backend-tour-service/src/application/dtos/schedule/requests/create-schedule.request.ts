export class CreateScheduleRequest {
    tourId: string;
    startTime: Date;
    maxCapacity: number;
    timeZone: string;
    isHoliday: boolean;
    holidaySurcharge: number;
    assignedStaff?: string;
}