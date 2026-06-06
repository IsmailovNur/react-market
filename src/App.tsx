import './App.css';
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./widgets/AppHeader/AppHeader.tsx";
import { Layout } from "antd";
import AppFooter from "./widgets/AppFooter/AppFooter.tsx";
import { AppRoutes } from "./shared/rounting/routes.ts";
import HomePage from "./pages/HomePage/HomePage.tsx";
import AddProductPage from "./pages/AddProductPage/AddProductPage.tsx";
import EditProductPage from "./pages/EditProductPage/EditProductPage.tsx";

function App() {

  return (
    <Layout className="App-wrapper">
      <AppHeader />

      <Content className="layout-content">
        <Routes>
          <Route path={AppRoutes.main} element={<HomePage />} />
          <Route path={AppRoutes.category} element={<HomePage />} />

          <Route path={AppRoutes.addProduct} element={<AddProductPage />} />
          <Route path={AppRoutes.editProduct} element={<EditProductPage />} />
        </Routes>
      </Content>

      <AppFooter />
    </Layout>
  )
}

export default App;
