import { useState } from 'react';
import { App } from 'antd';
import { productsApi } from "../../shared/api/api.ts";
import ProductForm from "../../widgets/ProductForm/ProductForm.tsx";
import "./AddProductPage.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../shared/rounting/routes.ts";

const AddProductPage = () => {
  const {message} = App.useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setIsSubmitting(true);
    console.log(values);
    try {
      await productsApi.createProduct(values);
      message.success('New product arrived!');

    } catch (e) {
      console.error(e);
      message.error('API Error. Field submission failed.');
    } finally {
      setIsSubmitting(false);
      navigate(AppRoutes.main)
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-form">
        <ProductForm
          formTitle="Add New Product"
          submitText="Create Product"
          isSubmitting={isSubmitting}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
};

export default AddProductPage;