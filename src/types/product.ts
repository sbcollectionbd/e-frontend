export interface Product {
  _id: string;
  name: string;
  category: string;
  subcategory?: string;
  images: string[];
  price: number;
  stock?: number;
}