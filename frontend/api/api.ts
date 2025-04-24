import useAuthStore, { AuthState, AuthStore } from '@/zustand/authStore';
import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL ?? 'https://localhost:5001/',
    responseType: 'json',
    timeout: 20000,
});

export const setupAxios = (authState: AuthState | null) => {
    api.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => {
            const accessToken = authState?.accessToken;

            if (accessToken) {
                request.headers.set("Authorization", `Bearer ${accessToken}`);
            }

            return request;
        },
        (error: any) => Promise.reject(error)
    );
}

export default api;