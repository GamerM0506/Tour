export interface CreateBookingRequest {
    scheduleId: string;
    adultsCount: number;
    childrenCount: number;
    infantsCount: number;
    selectedTierName: 'budget' | 'standard' | 'premium';
    needsWheelchair: boolean;
    allergies: string[];
    customerNote?: string;
    contactEmail: string;
    contactPhone: string;
    guestName: string;
}

export interface BookingResponse {
    id: string;
    totalPrice: number;
    clientSecret: string;
    status: string;
    expiresAt: string;
}