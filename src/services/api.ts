export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const fetchProductById = async (id: string | number): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};