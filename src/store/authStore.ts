import {create} from 'zustand';
import axios from 'axios';
import {AuthState} from "@/types/auth";
import {API_AUTH} from "@/constants/api";

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,

    login: async (username, password) => {
        set({isLoading: true, error: null});
        try {
            const res = await axios.post(API_AUTH.LOGIN, {
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
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            get().logout();
            return;
        }

        try {
            const res = await axios.post(API_AUTH.REFRESH, {
                refreshToken: refreshToken,
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
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        try {
            const res = await axios.get(API_AUTH.ME, {
                headers: {Authorization: `Bearer ${accessToken}`},
            });

            const {firstName, lastName, email} = res.data;
            set({user: {firstName, lastName, email}});
        } catch (err) {
            await get().refreshSession();
            const newAt = localStorage.getItem('accessToken');
            if (newAt) {
                const retry = await axios.get(API_AUTH.ME, {
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
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken || !refreshToken) return;

        set({accessToken: accessToken, refreshToken: refreshToken});

        get().getCurrentUser();

        setInterval(() => {
            get().refreshSession();
        }, 25 * 60 * 1000);
    },
}));