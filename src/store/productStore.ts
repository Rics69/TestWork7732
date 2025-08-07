import {Category, Product, ProductState} from "@/types/product";
import axios from "axios";
import {create} from "zustand";
import {API_PRODUCTS} from "@/constants/api";

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    categories: [],
    total: 0,
    limit: 12,
    skip: 0,
    search: '',
    category: '',
    sortBy: '',
    order: '',
    isLoading: false,
    error: null,
    pendingProducts: null,

    setSearch: (q) => {
        set({search: q, skip: 0});
    },
    setCategory: (catSlug) => {
        set({category: catSlug, skip: 0});
    },
    setSort: (sortBy, order) => {
        set({sortBy, order, skip: 0});
    },
    setPage: (page) => {
        const {limit} = get();
        set({skip: (page - 1) * limit});
    },

    fetchCategories: async () => {
        try {
            const res = await axios.get<Category[]>(API_PRODUCTS.CATEGORIES);
            set({categories: res.data});
        } catch (err: any) {
            console.error('Failed load categories', err);
        }
    },

    fetchProducts: async () => {
        set({isLoading: true, error: null});

        try {
            const {limit, skip, search, category, sortBy, order} = get();
            let url = '';
            const params: Record<string, string | number> = {limit, skip};

            if (search) {
                url = API_PRODUCTS.SEARCH;
                params.q = search;
            } else if (category) {
                url = API_PRODUCTS.BY_CATEGORY(category);
            } else {
                url = API_PRODUCTS.ALL;
            }

            if (sortBy) {
                params.sortBy = sortBy;
                params.order = order;
            }

            const query = new URLSearchParams();
            Object.entries(params).forEach(([k, v]) => query.append(k, String(v)));

            const res = await axios.get<{ products: Product[]; total: number }>(
                `${url}?${query.toString()}`
            );

            set({
                products: res.data.products,
                total: res.data.total,
                isLoading: false,
            });
        } catch (err: any) {
            set({
                error: err?.message || 'Failed to load products',
                isLoading: false,
            });
        }
    },
}));