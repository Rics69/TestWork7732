'use client';

import Link from 'next/link';
import {useAuthStore} from '@/store/authStore';
import styles from './Header.module.scss';

export default function Header() {
    const {user, logout} = useAuthStore();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>MyApp</h1>
                {user ? (
                    <div className={styles.userSection}>
            <span>
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