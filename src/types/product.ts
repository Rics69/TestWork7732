export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
}

export interface ProductState {
    products: Product[];
    categories: Category[];
    total: number;
    limit: number;
    skip: number;
    search: string;
    category: string;
    sortBy: 'price' | 'title' | '';
    order: 'asc' | 'desc' | '';
    isLoading: boolean;
    error: string | null;

    setSearch: (q: string) => void;
    setCategory: (catSlug: string) => void;
    setSort: (sortBy: 'price' | 'title', order: 'asc' | 'desc') => void;
    setPage: (page: number) => void;

    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}