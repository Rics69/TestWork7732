interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    refreshSession: () => Promise<void>;
    getCurrentUser: () => Promise<void>;
    init: () => void;
}