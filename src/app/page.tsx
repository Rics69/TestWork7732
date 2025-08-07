'use client';

import {useEffect} from 'react';
import {useProductStore} from '@/store/productStore';
import useDebounce from '@/hooks/useDebounce';
import LoadingOverlay from "@/app/components/LoadingOverlay/LoadingOverlay";
import Controls from "@/app/components/Controls/Controls";
import ProductGrid from "@/app/components/ProductGrid/ProductGrid";
import Pagination from "@/app/components/Pagination/Pagination";
import styles from './page.module.scss';

export default function HomePage() {
    const {
        products,
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
        setPage,
    } = useProductStore();

    const debouncedSearch = useDebounce(search, 500);
    const currentPage = skip / limit + 1;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, category, sortBy, order, skip]);

    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.wrapper}>
            {isLoading && <LoadingOverlay/>}
            <Controls/>
            <ProductGrid products={products} isLoading={isLoading}/>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
}