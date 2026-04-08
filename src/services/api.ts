import { NewProduct, Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
//==================Product Section ========================///

// 🔹 Get products
export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.data || data;
};

// 🔹 Add New products

/// tets api 

export async function addProduct(data: NewProduct) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add product");
  return res.json() as Promise<Product>;
}

// 🔹 Get single product
export const getSingleProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

// 🔹 Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products?featured=true`);
  const data = await res.json();
  return data.data || data;
};

// 🔹 Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products?category=${category}`);
  const data = await res.json();
  return data.data || data;
};

// 🔹Update products details
export const updateProduct = async (id: string, payload: Partial<Product>) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
// 🔹 Delete products
export const deleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

//==================Order Section ========================///

// 🔹 Create order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (order: any) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return res.json();
};


//==================Track Section ========================///

export const trackOrdersByPhone = async (phone: string) => {
  const res = await fetch(`${BASE_URL}/orders/track/${phone}`);
  const data = await res.json();
  return data;
};