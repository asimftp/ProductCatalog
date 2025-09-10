import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";
import type { ProductFormData } from "../models/ProductFormData";
import { getProduct, updateProduct } from "../api/productApi";

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductFormData | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(Number(id)).then(setProduct); // fetch product from backend
    }
  }, [id]);

  const handleEditProduct = async (updatedProduct: ProductFormData) => {
    await updateProduct(updatedProduct);
    console.log("Edited product:", updatedProduct);
    navigate("/"); // Navigate back to product list
  };

  if (!product) return <p>Loading...</p>; // show loader until product fetch ho jaye

  return (
    <ProductForm
      initialProduct={product}         // ✅ pre-fill form with fetched product
      onSubmit={handleEditProduct}
      title="Edit Product"
      buttonText="Save Product"
    />
  );
};
