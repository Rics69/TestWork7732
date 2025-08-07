'use client';

import { useAuthStore } from '@/store/authStore';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product }: { product: any }) {
    const { user } = useAuthStore();

    return (
        <div className={styles.card}>
            <img src={product.thumbnail} alt={product.title} className={styles.image} />
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <strong>${product.price}</strong>
            {user && <button className={styles.addButton}>Add to cart</button>}
        </div>
    );
}