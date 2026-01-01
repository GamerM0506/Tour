export class ScheduleResponse {
    id: string;
    startTime: Date;
    remainingSlots: number;
    status: string;
    isHoliday: boolean;
    holidaySurcharge: number;
    availableTiers: {
        tierName: string;
        basePrice: number;
    }[];
}