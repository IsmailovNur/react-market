import { type FC, useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Typography
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { CATEGORIES, type IProduct } from "../../shared/types/products.ts";

import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const {Title} = Typography;
const {TextArea} = Input;

interface ProductFormProps {
  formTitle: string;
  submitText: string;
  initialValues?: IProduct;
  isSubmitting: boolean;
  onFinish: (values: IProduct) => void;
}

const ProductForm: FC<ProductFormProps> = (props) => {
  const {
    formTitle,
    submitText,
    initialValues,
    isSubmitting,
    onFinish,
  } = props;

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <div className="form-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: '16px' }}
        ghost
      >
        Back
      </Button>
      <Card style={{ background: '#1f1f1f', borderColor: '#303030' }}>
        <Title level={3} style={{ marginBottom: '24px' }}>{formTitle}</Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="type"
            label={<span>Product Category</span>}
            rules={[{ required: true, message: 'Select a product type!' }]}
          >
            <Select placeholder="Select type ...">
              {CATEGORIES.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label={<span>Product Title</span>}
            rules={[
              { required: true, whitespace: true, message: 'Title cannot be empty!' },
              { transform: (val: string) => val?.trim() }
            ]}
          >
            <Input placeholder="Enter product name..." />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span>Description (Optional)</span>}
            rules={[{ transform: (value: string) => value?.trim() }]}
          >
            <TextArea rows={3} placeholder="Write description about product" />
          </Form.Item>

          <Form.Item
            name="price"
            label={<span>Price (KGS)</span>}
            rules={[{ required: true, type: 'number', min: 1, message: 'Price must be greater than 0!' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="150" />
          </Form.Item>

          <Form.Item
            name="picture"
            label={<span>Image URL (Optional)</span>}
            rules={[{ transform: (val: string) => val?.trim() }]}
          >
            <Input placeholder="image.jpg" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />} loading={isSubmitting} block>
              {submitText}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductForm;