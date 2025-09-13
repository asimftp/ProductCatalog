import { useEffect, useState } from 'react';
import type { Product } from '../models/Product';
import { getProducts } from '../api/productApi';
import { ProductCard } from '../components/ProductCard';


export const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            if (data) {
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setError("Getting things ready for you… just a moment.");
            setTimeout(() => {
                setError(null);
                console.clear();
            }, 50000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const CenteredMessage = ({ message }: { message: string }) => {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                <span className="">&nbsp;&nbsp;{message}</span>
            </div>
        );
    };
    if (loading) {
        return <CenteredMessage message="" />;
    }
    if (error) {
        return (
            <CenteredMessage message={error} />
        );
    }

    return (
        <div className="container py-4">
            {products.length > 0 ? (
                <div className="d-flex flex-wrap gap-4">
                    {products.map((p) => (
                        <ProductCard
                            key={p.productId}
                            product={p}
                            onDelete={loadProducts}   // refresh product list after deletion
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center text-muted fs-4"
                    style={{ height: '85vh' }}>
                    No products found.
                </div>
            )}
        </div>
    );
};
