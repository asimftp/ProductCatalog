import axios from 'axios';
import type { Product } from '../models/Product';
import type { Category } from '../models/Category';
import type { ProductFormData } from '../models/ProductFormData';

export const ApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE = ApiBaseUrl;

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get<Category[]>(`${API_BASE}/product/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getProducts = async (): Promise<Product[]> => {

    try {
        console.log("ApiBaseUrl:", ApiBaseUrl);
        const response = await axios.get<Product[]>(`${API_BASE}/product`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProduct = async (id: number): Promise<Product | null> => {
    try {
        const response = await axios.get<Product>(`${API_BASE}/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};

export const createProduct = async (product: ProductFormData): Promise<ProductFormData> => {
    /*
    why not JSON?
    - JSON can't carry binary (file) data.
    - File would need Base64 encoding - bigger and slower.
    Why FormData?
    -send request as multipart/form-data
    - handles both text and binary data
    - Browser & .net core (IFormFile) understand it natively
    */
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('categoryId', product.categoryId.toString());
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    if(product.file) {
        formData.append('file', product.file);
    }
    const response = await axios.post<ProductFormData>(`${API_BASE}/product`, formData);
    return response.data; // yahan se poora object wapas milega (with productId)
}

export const updateProduct = async (product: ProductFormData): Promise<boolean> => {
    try {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('categoryId', product.categoryId.toString());
        formData.append('price', product.price.toString());
        formData.append('description', product.description);
        if (product.file) {
            formData.append('file', product.file);
        }

        await axios.put(`${API_BASE}/product/${product.productId}`, formData);
        return true;
    } catch (error) {
        console.error(`Error updating product with id ${product.productId}:`, error);
        return false;
    }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        await axios.delete(`${API_BASE}/product/${id}`);
        return true; // success
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        return false; // fail
    }
};