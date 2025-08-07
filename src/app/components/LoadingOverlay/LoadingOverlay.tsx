'use client';

import styles from './LoadingOverlay.module.scss';

export default function LoadingOverlay() {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}></div>
        </div>
    );
}