export class CreateBookingRequest {
    scheduleId: string;
    contactEmail: string; 
    contactPhone: string;
    guestEmail: string;
    guestPhone: string;
    guestName: string;
    adultsCount: number;
    childrenCount: number;
    infantsCount: number;
    selectedTierName: string;
    customerNote?: string;
    needsWheelchair: boolean;
    allergies: string[];
}