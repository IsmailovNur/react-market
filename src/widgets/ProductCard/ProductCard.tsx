import { type FC } from 'react';
import { Card, Popconfirm, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { IProduct } from "../../shared/types/products.ts";

const {Meta} = Card;
const {Text} = Typography;

interface ProductCardProps {
  product: IProduct;
  onDelete: (id: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({product, onDelete}) => {
  const navigate = useNavigate();

  const imageSrc = product.image && product.image.trim() !== ''
    ? product.image
    : 'https://placehold.co/300x200/1f1f1f/ffffff?text=No+Image';

  return (
    <Card
      style={{background: '#1f1f1f', borderColor: '#303030'}}
      cover={
        <img
          alt={product.name}
          src={imageSrc}
          style={{
            height: '180px',
            objectFit: 'cover',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }}
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
        title={<span style={{color: '#fff'}}>{product.name}</span>}
        description={
          <Space size={4} style={{width: '100%'}}>
            <Text ellipsis style={{color: 'rgba(255,255,255,0.45)'}}>
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