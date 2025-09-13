import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { ProductFormData } from '../models/ProductFormData';
import { CategoryDropdown } from './CategoryDropdown';

interface ProductFormProps {
    initialProduct?: ProductFormData;   // it is optional use for editing
    title: string;         // title of the form 
    buttonText: string; // text for the submit button
    onSubmit: (product: ProductFormData) => void; // call on form submit
}

export function ProductForm({ initialProduct, title, buttonText, onSubmit }: ProductFormProps) {
    const [product, setProduct] = useState<ProductFormData>(
        initialProduct || {
            productId: 0,
            name: '',
            categoryId: 0,
            price: 0,
            description: '',
            file: undefined
        }
    );
    useEffect(() => {
        if (initialProduct) {
            setProduct(initialProduct);
        }
    }, [initialProduct]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                file: e.target.files![0]
            }));
        }
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(product);
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title mb-4">{title}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label fw-medium">Product Name</label>
                                    <input className="form-control form-control-lg"
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        placeholder="Enter product name" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-medium">Description</label>
                                    <textarea className="form-control"
                                        rows={3}
                                        placeholder="Write a short description of the product"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}>
                                    </textarea>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-12 col-sm-6">
                                        <label className="form-label fw-medium">Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input
                                                type="number"
                                                name="price"
                                                value={product.price === 0 ? '' : product.price} // to show placeholder when 0
                                                onChange={handleChange}
                                                className="form-control form-control-lg"
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label className="form-label fw-medium">Category</label>
                                        <CategoryDropdown
                                            value={product.categoryId}
                                            onChange={(id) => setProduct({ ...product, categoryId: id })}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-medium">Product Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="imagePath"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>

                                <div className="d-flex justify-content-center justify-content-md-end">
                                    <button type="submit" className="btn btn-primary btn-lg w-100 w-md-auto">{buttonText}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
