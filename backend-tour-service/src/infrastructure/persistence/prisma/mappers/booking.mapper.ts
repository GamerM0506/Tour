import { Booking as PrismaBooking } from '@prisma/client';
import { Booking } from 'src/domain/entities/booking.entity';
import { BookingStatus } from 'src/domain/enums/booking-status.enum';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';

export class BookingMapper {
    static toDomain(raw: PrismaBooking): Booking {
        return new Booking(
            raw.scheduleId,
            raw.contactEmail,
            raw.contactPhone,
            raw.guestName,
            raw.contactEmail,
            raw.contactPhone,
            raw.customerNote || "",
            raw.numberOfGuests,
            raw.totalPrice,
            raw.tourStartTime,
            raw.paymentStatus as PaymentStatus,
            raw.status as BookingStatus,
            raw.stripePaymentIntentId || undefined,
            raw.id
        );
    }

    static toPersistence(entity: Booking): any {
        return {
            id: entity.id,
            scheduleId: entity.scheduleId,
            tourStartTime: entity.tourStartTime,
            contactEmail: entity.contactEmail,
            contactPhone: entity.contactPhone,
            guestName: entity.guestName,
            numberOfGuests: entity.numberOfGuests,
            totalPrice: entity.totalPrice,
            paymentStatus: entity.paymentStatus,
            status: entity.status,
            stripePaymentIntentId: entity.stripePaymentIntentId,
            customerNote: entity.customerNote,
            deletedAt: entity.deletedAt
        };
    }
}