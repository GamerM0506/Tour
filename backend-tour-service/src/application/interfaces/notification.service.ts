export interface IBookingDetails {
    customerName: string;
    tourTitle: string;
    startTime: Date;
    totalPrice: number;
    adults: number;
    children: number;
}

export interface INotificationService {
    sendBookingSuccess(email: string, details: IBookingDetails): Promise<void>;
    sendRefundNotice(email: string, reason: string, amount: number): Promise<void>;
}