import { DomainException } from './domain.exception';

export class InvalidTourPriceException extends DomainException {
    constructor(price: number) {
        super(`Invalid tour price ${price}$. Only $15 or $40 packages are accepted`);
    }
}

export class IncompatibleTourException extends DomainException {
    constructor(reason: string) {
        super(`Tour not suitable for customer: ${reason}`);
    }
}

export class TourNotFoundException extends DomainException {
    constructor() { super('The requested tour could not be found or has been deleted'); }
}

