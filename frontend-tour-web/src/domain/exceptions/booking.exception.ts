import { DomainException } from './base.exception';

export class InvalidBookingDateException extends DomainException {
    constructor() {
        super('Invalid or past booking date.', 'INVALID_BOOKING_DATE');
    }
}

export class PaymentRequiredException extends DomainException {
    constructor() {
        super('The order needs to be paid to confirm.', 'PAYMENT_REQUIRED');
    }
}