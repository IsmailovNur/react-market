import type { IProductWithId } from "../../shared/types/products.ts";
import { type FC, useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import ProductCard from "../ProductCard/ProductCard.tsx";

import "./ProductsList.css";
import { App } from "antd";
import { productsApi } from "../../shared/api/api.ts";

interface ProductsListProps {
  list: IProductWithId[];
}

const ProductsList: FC<ProductsListProps> = ({list}) => {

  const {message} = App.useApp();
  const [currentList, setCurrentList] = useState<IProductWithId[]>(list);

  useEffect(() => {
    setCurrentList(list);
  }, [list]);

  const handleDelete = async (id: string) => {
    try {
      await productsApi.deleteProduct(id);
      message.success('Product deleted successfully');
      setCurrentList(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error(e);
      message.error('Failed to delete product');
    }
  };

  return (
    <div>
      <Title level={2} style={{color: '#fff'}}>Products Catalog</Title>
      <div className="product-list">
        {currentList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;