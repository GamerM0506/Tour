export interface IStripeService {
    createPaymentIntent(amount: number, currency: string): Promise<{ id: string, clientSecret: string }>;
    capturePayment(paymentIntentId: string): Promise<void>;
    voidPayment(paymentIntentId: string): Promise<void>;
    refundPayment(paymentIntentId: string): Promise<void>;
}