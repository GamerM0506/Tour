import axios from 'axios';

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'System connection error';
        return Promise.reject(new Error(message));
    }
);