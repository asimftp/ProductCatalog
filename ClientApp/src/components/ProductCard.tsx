import { useNavigate } from 'react-router-dom';
import type { Product } from '../models/Product';
import { deleteProduct } from '../api/productApi';

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

export const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/EditProduct/${product.productId}`);
  };
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      await deleteProduct(product.productId);
      if (onDelete) onDelete(); // refresh product list
    }
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.imagePath}
        className="card-img-top"
        alt={product.name}
        style={{ objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text" style={{ height: '5rem', overflow: 'hidden' }}>
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </p>
        <h6> Price: ₹{product.price.toFixed(2)}</h6>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-sm btn-primary" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
