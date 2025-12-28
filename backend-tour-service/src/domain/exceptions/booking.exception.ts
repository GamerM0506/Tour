import { DomainException } from './domain.exception';

export class BookingCapacityExceededException extends DomainException {
    constructor() {
        super('The number of guests has exceeded the remaining limit of the tour');
    }
}

export class InvalidGuestCountException extends DomainException {
    constructor() {
        super('The number of guests must be greater than 0');
    }
}

export class CancellationDeadlineException extends DomainException {
    constructor() {
        super('Cancellation deadline has passed (must be 24h before)');
    }
}

export class BookingNotFoundException extends DomainException {
    constructor(bookingId?: string) {
        const message = bookingId
            ? `Booking with ID ${bookingId} was not found`
            : 'The requested booking does not exist in our system';
        super(message);
    }
}