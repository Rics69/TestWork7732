'use client';

import Link from 'next/link';
import styles from './styles/not-found.module.scss';

export default function NotFoundPage() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Page Not Found</h2>
            <p className={styles.description}>
                Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>

            <Link href="/" className={styles.button}>
                Go to Homepage
            </Link>
        </div>
    );
}