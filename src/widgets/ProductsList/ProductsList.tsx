import type { IProduct } from "../../shared/types/products.ts";
import type { FC } from "react";
import Title from "antd/es/typography/Title";

interface ProductsListProps {
  list: IProduct[];
}

const ProductsList: FC<ProductsListProps> = ({list}) => {
  console.log(list);

  return (
    <div>
      <Title level={1}>ProductsList</Title>
      {list.map((product) => (
        <div>

          <div>
            <b>{product.name}</b>
          </div>
          <div>
            <i>{product.description}</i>
          </div>
          <div>
            <span>{product.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;