export class CreateBookingRequest {
    scheduleId: string;
    contactEmail: string;
    contactPhone: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    numberOfGuests: number;
    customerNote?: string;
    needsWheelchair: boolean;
    allergies: string[];
}   