import { useEffect, useState } from "react";
import { getCategories } from '../api/productApi';
import type { Category } from "../models/Category";

interface CategoryDropdownProps {
  value: number;
  onChange: (id: number) => void;
}
export const CategoryDropdown = ({ value, onChange }: CategoryDropdownProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <select className="form-select form-select-lg"
     value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={0}>Select category</option>
      {categories.map((c) => (
        <option key={c.categoryId} value={c.categoryId}>
          {c.categoryName}
        </option>
      ))}
    </select>
  );
};
