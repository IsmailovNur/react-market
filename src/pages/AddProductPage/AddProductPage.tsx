import { useState } from 'react';
import { App } from 'antd';
import { productsApi } from "../../shared/api/api.ts";
import ProductForm from "../../widgets/ProductForm/ProductForm.tsx";
import "./AddProductPage.css";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "../../shared/types/products.ts";

const AddProductPage = () => {
  const {message} = App.useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values: IProduct) => {
    setIsSubmitting(true);
    try {
      await productsApi.createProduct(values);
      message.success('New product arrived!');
      navigate(`/category/${values.type}`);
    } catch (e) {
      console.error(e);
      message.error('API Error. Field submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-page">
      <ProductForm
        formTitle="Add New Product"
        submitText="Create Product"
        isSubmitting={isSubmitting}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default AddProductPage;