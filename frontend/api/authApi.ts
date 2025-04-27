import { LogInRequest, LogInResponse } from "@/types/auth";
import api from "./api";

const URL_PREFIX = 'api/Auth';

export function logIn(request: any) {
    return api.post(`${URL_PREFIX}/login`, request);
}

export function register(request: any) {
    return api.post(`${URL_PREFIX}/register`, request);
}