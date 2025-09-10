export interface ProductFormData {
    productId: number;
    name: string;
    categoryId: number;
    price: number;
    description: string;
    file?: File;
}