export type ProductCategory =
  'fruits'
  | 'beverages'
  | 'baker'
  | 'meat'
  | 'dairy';

export interface IProduct {
  id: string;
  category: ProductCategory;
  name: string;
  price: number;
  description?: string;
  image?: string;
}
