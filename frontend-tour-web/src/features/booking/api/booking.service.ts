import api from '@/core/api/axios-instance';
import { CreateBookingRequest, BookingResponse } from '@/core/api/types/booking';

export const bookingApi = {
    reserve: (data: CreateBookingRequest): Promise<BookingResponse> => api.post('/bookings', data),
    getDetail: (id: string) => api.get(`/bookings/${id}`),
    cancel: (id: string) => api.patch(`/bookings/${id}/cancel`),
}