import ProductsList from "../../widgets/ProductsList/ProductsList.tsx";
import { Typography } from 'antd';
import { useEffect, useState } from "react";
import { productsApi } from "../../shared/api/api.ts";

import "./HomePage.css";
import Loader from "../../shared/Loader/Loader.tsx";

const {Title} = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const data = await productsApi.getProducts();
      console.log(data);
      setProducts(data);
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  return (
    <div>

      <Loader isLoading={isLoading} />
      <Title level={1}>Recent Publications</Title>

      {!isLoading && <ProductsList list={products} />}
    </div>
  );
};

export default HomePage;