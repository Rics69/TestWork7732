'use client';

import {useAuthStore} from '@/store/authStore';
import styles from './ProductCard.module.scss';

export default function ProductCard({product}: { product: any }) {
    const {user} = useAuthStore();

    return (
        <div className={styles.card}>
            <img src={product.thumbnail} alt={product.title} className={styles.image}/>
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.price}>${product.price}</p>
            {user && <button className={styles.addButton}>Add to cart</button>}
        </div>
    );
}