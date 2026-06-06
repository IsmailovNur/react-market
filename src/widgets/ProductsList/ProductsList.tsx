import type { IProduct } from "../../shared/types/products.ts";
import type { FC } from "react";
import Title from "antd/es/typography/Title";
import ProductCard from "../ProductCard/ProductCard.tsx";

import "./ProductsList.css";

interface ProductsListProps {
  list: IProduct[];
}

const ProductsList: FC<ProductsListProps> = ({list}) => {

  return (
    <div>
      <Title level={1}>ProductsList</Title>
      <div className="product-list">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={() => {
          }} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;