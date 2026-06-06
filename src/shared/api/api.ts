import axios from 'axios';
import type {
  IProduct,
  IProductWithId,
  ProductCategory
} from "../types/products.ts";

const firebaseEndpoint = axios.create({
  baseURL: 'https://js-31-nurisma-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const productsApi = {
  getProducts: async (category?: ProductCategory): Promise<IProductWithId[]> => {
    let url = '/products.json';

    if (category) {
      url += `?orderBy="type"&equalTo="${category}"`;
    }

    const response = await firebaseEndpoint.get<Record<string, IProduct> | null>(url);
    const data = response.data;
    if (!data) return [];

    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  },

  getProductById: async (id: string): Promise<IProduct | null> => {
    const response = await firebaseEndpoint.get<IProduct | null>(`/products/${id}.json`);
    return response.data;
  },

  createProduct: async (product: IProduct): Promise<void> => {
    await firebaseEndpoint.post('/products.json', product);
  },

  updateProduct: async (id: string, product: IProduct): Promise<void> => {
    await firebaseEndpoint.put(`/products/${id}.json`, product);
  },

  deleteProduct: async (id: string): Promise<void> => {
    await firebaseEndpoint.delete(`/products/${id}.json`);
  }

};