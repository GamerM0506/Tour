import Stripe from 'stripe';
import { IStripeService } from 'src/application/interfaces/stripe.service';

export class StripeService implements IStripeService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-12-18.acacia' as any
        });
    }

    async createPaymentIntent(amount: number, currency: string): Promise<{ id: string; clientSecret: string; }> {
        const amountInCents = Math.round(amount * 100);

        const intent = await this.stripe.paymentIntents.create({
            amount: amountInCents,
            currency: currency.toLowerCase(),
            capture_method: 'manual',
            payment_method_types: ['card'],
        });

        return {
            id: intent.id,
            clientSecret: intent.client_secret!
        };
    }

    async capturePayment(paymentIntentId: string): Promise<void> {
        await this.stripe.paymentIntents.capture(paymentIntentId);
    }

    async voidPayment(paymentIntentId: string): Promise<void> {
        await this.stripe.paymentIntents.cancel(paymentIntentId);
    }

    async refundPayment(paymentIntentId: string): Promise<void> {
        await this.stripe.refunds.create({ payment_intent: paymentIntentId });
    }
}