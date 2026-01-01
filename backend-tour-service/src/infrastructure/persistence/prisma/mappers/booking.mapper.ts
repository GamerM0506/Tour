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
            raw.guestEmail, 
            raw.guestPhone, 
            raw.adultsCount,
            raw.childrenCount,
            raw.infantsCount,
            raw.selectedTierName,
            raw.totalPrice,
            raw.tourStartTime,
            (raw.dietaryRequirements as string[]) || [], 
            raw.isWheelchairRequired,
            raw.customerNote || "",
            raw.status as BookingStatus,
            raw.paymentStatus as PaymentStatus,
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
            guestEmail: entity.guestEmail,
            guestPhone: entity.guestPhone,
            adultsCount: entity.adultsCount,
            childrenCount: entity.childrenCount,
            infantsCount: entity.infantsCount,
            selectedTierName: entity.selectedTierName,
            totalPrice: entity.totalPrice,
            paymentStatus: entity.paymentStatus,
            status: entity.status,
            stripePaymentIntentId: entity.stripePaymentIntentId,
            dietaryRequirements: entity.dietaryRequirements,
            isWheelchairRequired: entity.isWheelchairRequired,
            customerNote: entity.customerNote,
            deletedAt: entity.deletedAt
        };
    }
}