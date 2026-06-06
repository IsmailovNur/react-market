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

export interface ICategory {
  title: string;
  id: string;
}

export const CATEGORIES: ICategory[] = [
  {title: 'Fruits', id: 'fruits'},
  {title: 'Dairy', id: 'dairy'},
  {title: 'Meat', id: 'meat'},
  {title: 'Bakery', id: 'bakery'},
  {title: 'Beverages', id: 'beverages'},
];