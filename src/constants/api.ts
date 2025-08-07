export const API_BASE = 'https://dummyjson.com';

export const API_AUTH = {
    LOGIN: `${API_BASE}/auth/login`,
    REFRESH: `${API_BASE}/auth/refresh`,
    ME: `${API_BASE}/auth/me`,
};

export const API_PRODUCTS = {
    ALL: `${API_BASE}/products`,
    SEARCH: `${API_BASE}/products/search`,
    CATEGORIES: `${API_BASE}/products/categories`,
    BY_CATEGORY: (slug: string) => `${API_BASE}/products/category/${encodeURIComponent(slug)}`,
};