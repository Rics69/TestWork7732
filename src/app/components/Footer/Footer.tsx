'use client';

import {useAuthStore} from '@/store/authStore';
import styles from './Footer.module.scss';

export default function Footer() {
    const {user} = useAuthStore();
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span>&copy; {year}</span>
                {user && <span>Logged as {user.email}</span>}
            </div>
        </footer>
    );
}