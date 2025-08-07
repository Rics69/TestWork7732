'use client';

import Link from 'next/link';
import {useAuthStore} from '@/store/authStore';
import styles from './Header.module.scss';

export default function Header() {
    const {user, logout} = useAuthStore();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Abelohost
                </Link>

                {user ? (
                    <div className={styles.userSection}>
                        <span className={styles.username}>
                            {user.firstName} {user.lastName}
                        </span>
                        <button onClick={logout} className={styles.logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className={styles.loginLink}>
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}