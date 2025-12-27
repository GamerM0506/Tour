export interface INotificationService {
    sendBookingSuccess(email: string, details: any): Promise<void>;
    sendRefundNotice(email: string, reason: string): Promise<void>;
}