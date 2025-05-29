export const API_BASE_URL = 'https://fakestoreapi.com';

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCT_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
}; 