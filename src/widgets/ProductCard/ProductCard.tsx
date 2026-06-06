import { type FC } from 'react';
import { Card, Popconfirm, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { IProductWithId } from "../../shared/types/products.ts";

import "./ProductCard.css";

const {Meta} = Card;
const {Text} = Typography;

interface ProductCardProps {
  product: IProductWithId;
  onDelete: (id: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({product, onDelete}) => {
  const navigate = useNavigate();
  console.log(product)

  const imageSrc = product.picture && product.picture.trim() !== ''
    ? product.picture
    : 'https://placehold.co/300x200/1f1f1f/ffffff?text=No+Image';

  return (
    <Card
      style={{background: '#1f1f1f', borderColor: '#303030'}}
      cover={
        <img
          className="product-card-img"
          alt={product.title}
          src={imageSrc}
        />
      }
      actions={[
        <EditOutlined key="edit" style={{color: '#13c2c2'}} onClick={() => navigate(`/products/${product.id}/edit`)} />,
        <Popconfirm
          title="Delete product"
          description="Are you sure you want to remove this item?"
          onConfirm={() => onDelete(product.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined key="delete" style={{color: '#ff4d4f'}} />
        </Popconfirm>
      ]}
    >
      <Meta
        title={<span>{product.title}</span>}
        description={
          <Space className="product-card-bottom"  >
            <Text ellipsis style={{color: '#4e4c4c'}}>
              {product.description || 'No description provided'}
            </Text>
            <Text strong style={{color: '#ffec3d', fontSize: '16px'}}>
              {product.price.toLocaleString()} KGS
            </Text>
          </Space>
        }
      />
    </Card>
  );
};

export default ProductCard;