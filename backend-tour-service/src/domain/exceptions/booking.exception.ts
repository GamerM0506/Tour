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