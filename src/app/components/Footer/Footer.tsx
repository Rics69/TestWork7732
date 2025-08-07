'use client';

import {useAuthStore} from '@/store/authStore';
import styles from './Footer.module.scss';

export default function Footer() {
    const {user} = useAuthStore();
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span>&copy; {year} Abelohost</span>
                {user && <span className={styles.loggedIn}>Logged as {user.email}</span>}
            </div>
        </footer>
    );
}