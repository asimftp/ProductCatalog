import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm'
import type { ProductFormData } from '../models/ProductFormData';
import { createProduct } from '../api/productApi';

export const AddProduct = () => {
    const navigation = useNavigate();
    const handleAddProduct = async (product: ProductFormData) => {
        await createProduct(product);
        console.log('Added product:', product);
        navigation('/'); // Navigate back to product list after adding
    }

    return (
        <ProductForm onSubmit={handleAddProduct}
            title="Add Product"
            buttonText="Add Product"
            />
    )
}
