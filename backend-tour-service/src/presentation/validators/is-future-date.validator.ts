import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value instanceof Date ? value > today : new Date(value) > today;
    }

    defaultMessage(args: ValidationArguments) {
        return 'The departure date must be a date in the future!';
    }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFutureDateConstraint,
        });
    };
}