import { Layout } from "antd";
import "./AppHeader.css";
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../../shared/rounting/routes.ts";

const {Header} = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <Link to={AppRoutes.main}>
        Mini-Market
      </Link>

      <nav className="header-nav">
        <NavLink to={AppRoutes.main} className="nav-item">Products</NavLink>
        <NavLink to={AppRoutes.addProduct} className="nav-item">Add new product</NavLink>
      </nav>
    </Header>
  );
};

export default AppHeader;