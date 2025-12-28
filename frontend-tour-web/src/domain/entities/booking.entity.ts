export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export class Booking {
    constructor(
        public readonly id: string,
        public readonly tourId: string,
        public readonly scheduleId: string,
        public readonly totalAmount: number,
        public readonly status: BookingStatus,
        public readonly paymentStatus: PaymentStatus,
        public readonly createdAt: Date,
        public readonly clientSecret?: string,
    ) { }

    get needsPayment(): boolean {
        return this.status === 'pending' && this.paymentStatus === 'unpaid' && !!this.clientSecret;
    }

    get formattedCreatedAt(): string {
        return this.createdAt.toLocaleDateString('vi-VN');
    }
}