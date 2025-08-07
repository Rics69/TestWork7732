'use client';

import ProductCard from '../ProductCard/ProductCard';
import styles from './Grid.module.scss';

export default function ProductGrid({products, isLoading}: {
    products: any[];
    isLoading: boolean;
}) {
    return (
        <div className={`${styles.grid} ${isLoading ? styles.fading : ''}`}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
}