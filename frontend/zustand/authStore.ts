import { User } from '@/types/user';
import zustand, { create } from 'zustand';

export type AuthState = {
    user: User | null,
    accessToken: string | null
}

export type AuthStore = {
    authState: AuthState | null,
    saveAuthState: (payload: AuthState) => void,
    logOut: () => void
};

const initialAuthState: AuthState = {
    user: null,
    accessToken: null
}

const useAuthStore = create<AuthStore>()((set) => ({
    authState: initialAuthState,
    saveAuthState: (payload) => set((state) => ({ authState: payload })),
    logOut: () => set({ authState: null }) 
}));

export default useAuthStore;