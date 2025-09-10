import { useEffect, useState } from 'react';
import type { Product } from '../models/Product';
import { getProducts } from '../api/productApi';
import { ProductCard } from '../components/ProductCard';


export const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            if(data){
            setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    if (loading) {
        return <div className="container py-4">Loading products...</div>;
    }

    return (
        <div className="container py-4">
            <div className="d-flex flex-wrap gap-4">
                {products.length > 0 ? (
                    products.map((p) => (
                        <ProductCard
                            key={p.productId}
                            product={p}
                            onDelete={loadProducts}   // refresh product list after deletion
                        />
                    ))
                ) : (
                    <div>No products found.</div>
                )}
            </div>
        </div>
    );
};
