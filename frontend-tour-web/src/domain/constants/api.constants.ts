export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
    ENDPOINTS: {
        TOURS: '/tours',
        BOOKINGS: '/bookings',
        SCHEDULES: '/schedules',
    },
} as const;