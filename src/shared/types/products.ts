export type ProductCategory =
  'fruits'
  | 'beverages'
  | 'bakery'
  | 'meat'
  | 'dairy';

export interface IProduct {
  type: ProductCategory
  title: string
  price: number
  description?: string
  picture?: string
}

export interface IProductWithId extends IProduct {
  id: string;
}

export interface ICategory {
  title: string;
  id: ProductCategory;
}

export const CATEGORIES: ICategory[] = [
  {title: 'Fruits', id: 'fruits'},
  {title: 'Dairy', id: 'dairy'},
  {title: 'Meat', id: 'meat'},
  {title: 'Bakery', id: 'bakery'},
  {title: 'Beverages', id: 'beverages'},
];