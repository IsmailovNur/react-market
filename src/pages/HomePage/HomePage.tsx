import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { App, Col, Empty, Row, Typography } from 'antd';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import {
  CATEGORIES,
  type IProductWithId,
  type ProductCategory
} from "../../shared/types/products.ts";
import { productsApi } from "../../shared/api/api.ts";
import Loader from "../../shared/Loader/Loader.tsx";
import "./HomePage.css";

const {Title} = Typography;

const ProductsPage = () => {
  const {categoryId} = useParams<{ categoryId: ProductCategory }>();
  const {message} = App.useApp();

  const [products, setProducts] = useState<IProductWithId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentCategoryObj = CATEGORIES.find(c => c.id === categoryId);
  const pageTitle = currentCategoryObj ? currentCategoryObj.title : 'All';

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productsApi.getProducts(categoryId);
      setProducts(data);
    } catch (e) {
      console.error(e);
      void message.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, [categoryId]);

  const handleDelete = async (id: string) => {
    try {
      await productsApi.deleteProduct(id);
      message.success('Product deleted from server');
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error(e);
      message.error('Failed to delete product');
    }
  };

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} md={6}>
        <div className="category-sidebar">
          <Title level={4} style={{color: '#13c2c2', marginBottom: '16px'}}>
            Categories
          </Title>
          <ul className="category-list">
            <li>
              <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
                All
              </NavLink>
            </li>
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <NavLink to={`/category/${cat.id}`} className={({isActive}) => isActive ? 'active' : ''}>
                  {cat.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Col>
      <Col xs={24} md={18}>
        <Title level={2}>
          {pageTitle}
        </Title>

        <Loader isLoading={isLoading} />

        {!isLoading && products.length === 0 && (
          <Empty description={
            <span style={{color: 'rgba(255,255,255,0.45)'}}>No products found in this category.</span>} />
        )}

        {!isLoading && (
          <Row gutter={[24, 24]}>
            {products.map(product => (
              <Col xs={24} sm={12} lg={8} key={product.id}>
                <ProductCard product={product} onDelete={handleDelete} />
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default ProductsPage;