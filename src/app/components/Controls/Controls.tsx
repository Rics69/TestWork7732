'use client';

import {useProductStore} from '@/store/productStore';
import styles from './Controls.module.scss';

export default function Controls() {
    const {
        categories,
        search,
        category,
        sortBy,
        order,
        setSearch,
        setCategory,
        setSort,
    } = useProductStore();

    return (
        <div className={styles.controls}>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <select
                value={`${sortBy}:${order}`}
                onChange={(e) => {
                    const [s, o] = e.target.value.split(':') as ['price', 'asc' | 'desc'];
                    setSort(s, o);
                }}
            >
                <option value=":">Sort by</option>
                <option value="price:asc">Price ↑</option>
                <option value="price:desc">Price ↓</option>
            </select>
        </div>
    );
}