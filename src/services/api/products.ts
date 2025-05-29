import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';
import { Product, Category } from '../../types/product';

/**
 * Fetches all product categories from the API
 * @returns Array of category strings
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetches products by category
 * @param category - The category to filter by
 * @returns Array of products in the specified category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT_BY_CATEGORY(category)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

/**
 * Fetches a single product by ID
 * @param id - The product ID
 * @returns The product object
 */
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}; 