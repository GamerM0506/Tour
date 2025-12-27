export class ScheduleResponse {
    id: string;
    startTime: Date;
    remainingSlots: number;
    status: string;
    isHoliday: boolean;
    finalPrice: number;
}