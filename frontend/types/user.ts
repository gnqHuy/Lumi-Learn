export type User = {
    id: string,
    username: string,
    name: string,
    email: string,
    phone: string,
    birthday: Date,
    role: string,
};

export type ChangeProfile = {
    email: string, 
    phone: string, 
    birthday: Date, 
    name: string
}