'use client';

import {useEffect} from 'react';
import {useProductStore} from '@/store/productStore';
import {useAuthStore} from '@/store/authStore';
import useDebounce from "@/hooks/useDebounce";
import styles from './page.module.scss';

export default function HomePage() {
    const {
        products,
        categories,
        total,
        limit,
        skip,
        search,
        category,
        sortBy,
        order,
        isLoading,
        error,
        fetchProducts,
        fetchCategories,
        setSearch,
        setCategory,
        setSort,
        setPage,
    } = useProductStore();
    const {user} = useAuthStore();
    const debouncedSearch = useDebounce(search, 500);

    const currentPage = skip / limit + 1;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, category, sortBy, order, skip]);

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.wrapper}>
            {isLoading && <div className={styles.overlay}>Loading...</div>}
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

            <div className={`${styles.grid} ${isLoading ? styles.fading : ''}`}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <img src={product.thumbnail} alt={product.title} className={styles.image}/>
                        <h3>{product.title}</h3>
                        <p>{product.category}</p>
                        <strong>${product.price}</strong>
                        {user && <button className={styles.addButton}>Add to cart</button>}
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                <button onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1}>
                    Prev
                </button>
                <span>
        Page {currentPage} of {totalPages}
      </span>
                <button onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}