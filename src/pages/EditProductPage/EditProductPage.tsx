import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { App } from 'antd';
import { productsApi } from '../../shared/api/api.ts';
import { AppRoutes } from '../../shared/rounting/routes.ts';
import ProductForm from '../../widgets/ProductForm/ProductForm.tsx';
import Loader from '../../shared/Loader/Loader.tsx';
import type { IProduct } from "../../shared/types/products.ts";

import "./EditProductPage.css";

const EditProductPage = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {message} = App.useApp();

  const [productData, setProductData] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await productsApi.getProductById(id);
        if (data) {
          setProductData(data);
        } else {
          message.error('Product not found!');
          navigate(AppRoutes.main);
        }
      } catch (e) {
        console.error(e);
        message.error('Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [id, navigate]);

  const handleFinish = async (values: IProduct) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await productsApi.updateProduct(id, values);
      message.success('Product updated successfully!');
      navigate(AppRoutes.main);
    } catch (e) {
      console.error(e);
      message.error('Failed to save changes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader isLoading={isLoading} />;

  return (
    <div className="edit-product-page">
      <div className="edit-product-form">
        <ProductForm
          formTitle="Edit Product"
          submitText=" Save Changes"
          initialValues={productData || undefined}
          isSubmitting={isSubmitting}
          onFinish={handleFinish}
        />
      </div>
    </div>
  )
    ;
};

export default EditProductPage;