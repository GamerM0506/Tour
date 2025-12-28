import { DomainException } from './domain.exception';

export class PastScheduleException extends DomainException {
    constructor() {
        super('Cannot create or interact with a schedule in the past');
    }
}

export class ScheduleNotFoundException extends DomainException {
    constructor() {
        super('The schedule does not exist');
    }
}