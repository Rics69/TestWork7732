import {create} from 'zustand';
import axios from 'axios';
import {AuthState} from "@/types/auth";

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,

    login: async (username, password) => {
        set({isLoading: true, error: null});
        try {
            const res = await axios.post('https://dummyjson.com/auth/login', {
                username,
                password,
                expiresInMins: 30,
            });

            const {accessToken, refreshToken, firstName, lastName, email} = res.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            set({
                accessToken,
                refreshToken,
                user: {firstName, lastName, email},
                isLoading: false,
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || 'Login failed',
                isLoading: false,
            });
        }
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({accessToken: null, refreshToken: null, user: null});
    },

    refreshSession: async () => {
        const rt = localStorage.getItem('refreshToken');
        if (!rt) {
            get().logout();
            return;
        }

        try {
            const res = await axios.post('https://dummyjson.com/auth/refresh', {
                refreshToken: rt,
                expiresInMins: 30,
            });

            const {accessToken: newAT, refreshToken: newRT} = res.data;

            localStorage.setItem('accessToken', newAT);
            localStorage.setItem('refreshToken', newRT);

            set({accessToken: newAT, refreshToken: newRT});
        } catch (err) {
            get().logout();
        }
    },

    getCurrentUser: async () => {
        const at = localStorage.getItem('accessToken');
        if (!at) return;

        try {
            const res = await axios.get('https://dummyjson.com/auth/me', {
                headers: {Authorization: `Bearer ${at}`},
            });

            const {firstName, lastName, email} = res.data;
            set({user: {firstName, lastName, email}});
        } catch (err) {
            await get().refreshSession();
            const newAt = localStorage.getItem('accessToken');
            if (newAt) {
                const retry = await axios.get('https://dummyjson.com/auth/me', {
                    headers: {Authorization: `Bearer ${newAt}`},
                });
                const {firstName, lastName, email} = retry.data;
                set({user: {firstName, lastName, email}});
            } else {
                get().logout();
            }
        }
    },

    init: () => {
        const at = localStorage.getItem('accessToken');
        const rt = localStorage.getItem('refreshToken');
        if (!at || !rt) return;

        set({accessToken: at, refreshToken: rt});

        get().getCurrentUser();

        setInterval(() => {
            get().refreshSession();
        }, 25 * 60 * 1000);
    },
}));