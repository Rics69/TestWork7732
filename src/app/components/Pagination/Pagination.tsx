'use client';

import styles from './Pagination.module.scss';

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       setPage,
                                   }: {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}) {
    return (
        <div className={styles.pagination}>
            <button onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1}>
                Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
        </div>
    );
}