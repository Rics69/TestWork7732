'use client';

import {useAuthStore} from '@/store/authStore';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
    const {login, error, isLoading, accessToken} = useAuthStore();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const validate = () => {
        if (username.length < 3 || password.length < 3) {
            setFormError('Username and password must be at least 3 characters.');
            return false;
        }
        setFormError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await login(username, password);
    };

    useEffect(() => {
        if (accessToken) {
            router.push('/');
        }
    }, [accessToken]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {formError && <p className={styles.error}>{formError}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}