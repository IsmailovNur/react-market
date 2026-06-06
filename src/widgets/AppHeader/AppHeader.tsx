import { Layout } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

import "./AppHeader.css";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../shared/rounting/routes.ts";

const {Header} = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <NavLink to={AppRoutes.main}><AntDesignOutlined className="header-logo" /></NavLink>
      <nav className="header-nav">
        <NavLink to={AppRoutes.main} className="nav-item">Home</NavLink>
      </nav>
    </Header>
  );
};

export default AppHeader;