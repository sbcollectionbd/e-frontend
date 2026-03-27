import { Product } from "@/types/product";

const BASE_URL = "http://localhost:5000/api";

// 🔹 Get products
export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.data || data;
};

// 🔹 Get single product
export const getSingleProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

// 🔹 Create order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (order: any) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  return res.json();
};