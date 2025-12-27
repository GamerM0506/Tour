export class BookingResponse {
    id: string;
    status: string;
    paymentStatus: string;
    totalPrice: number;
    tourStartTime: Date;
    expiresAt: Date;
}