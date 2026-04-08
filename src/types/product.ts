export interface Product {
  _id: string;
  name: string;
  category: string;
  subcategory?: string;
  images: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  stock?: number;
  description?: string;
  isFeatured?: boolean;
}

// For adding a product (no _id yet)
export type NewProduct = Omit<Product, "_id" | "discountPercentage">;