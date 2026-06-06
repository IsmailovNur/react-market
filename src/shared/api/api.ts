import axios from 'axios';
import type { IProduct } from "../types/products.ts";

const firebaseEndpoint = axios.create({
  baseURL: 'https://js-31-nurisma-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const productsApi = {
  getProducts: async (): Promise<IProduct[]> => {
    const url = '/products.json';

    const response = await firebaseEndpoint.get<Record<string, IProduct> | null>(url);
    const data = response.data;
    if (!data) return [];

    return Object.keys(data).map((key) => ({
      ...data[key],
    }));
  }

};