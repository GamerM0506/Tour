import { DomainException } from './base.exception';

export class TourNotFoundException extends DomainException {
    constructor(tourId: string) {
        super(`Tour not found with ID: ${tourId}`, 'TOUR_NOT_FOUND');
    }
}

export class TourFullException extends DomainException {
    constructor() {
        super('Unfortunately, this tour is fully booked.', 'TOUR_FULL');
    }
}