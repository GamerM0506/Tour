export interface IStripeService {
    createPaymentIntent(amountInCents: number, currency: string): Promise<{ id: string, clientSecret: string }>;
    capturePayment(paymentIntentId: string): Promise<void>;
    voidPayment(paymentIntentId: string): Promise<void>;
    refundPayment(paymentIntentId: string, amount?: number): Promise<void>;
}