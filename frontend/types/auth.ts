import { User } from "./user"

export type LogInRequest = {
    username: string,
    password: string
}

export type LogInResponse = {
    user: User,
    authToken: string
}