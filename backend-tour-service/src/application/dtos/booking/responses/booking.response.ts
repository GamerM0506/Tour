export class BookingResponse {
    id: string;
    status: string;
    paymentStatus: string;
    totalPrice: number;
    currency: string;
    tourStartTime: Date;
    expiresAt: Date;
    guestSummary: {
        adults: number;
        children: number;
        infants: number;
    };
}