import { DomainException } from './domain.exception';

export class EmailAlreadyExistsException extends DomainException {
    constructor() {
        super('This email address is already in use');
    }
}

export class UnauthorizedException extends DomainException {
    constructor() {
        super('You are not authorized to perform this action');
    }
}