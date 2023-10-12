import React, { useState } from "react";
import { HomeRoutes } from "../../routes/index";
// import { useNavigate } from "react-router-dom";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label,key, icon, children, ) {
  return {
    // label,
    // path,
    key,
    icon,
    children,
    label,
  };
}

function Navbar() {
  return (
    <Header
      style={{
        backgroundColor: "#222", // Set the background color
        height: "60px", // Set the height
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center items vertically and horizontally
      }}
    >
      <h1 style={{ color: "white" }}>
        ADVANCED REHAB & HEALTHCARE OF LIVE OAK
      </h1>
    </Header>
  );
}
const items = [
  getItem("Pie Chart", "1", <PieChartOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("POPULATION", "population"),
    getItem("IMMUNIZATION", "4"),
    getItem("ASSESSMENT", "5"),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  // const navigate = useNavigate();

  // const onClick = function (title) {
  //   console.log(title.key);

  //   // Check if the clicked item is "Population" and navigate to the /population route
  //   if (title.key === "population") {
  //     navigate.push("/population");
  //   }
  // };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(34, 34, 34)",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "rgb(34, 34, 34)" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          // onClick={onClick}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "rgb(34, 34, 34)" }}
        />

        {/* {items.map((item) => {
          
            return item.children && (
              item.children.length>0 && item.children.map(data=>{
                console.log(data.path)
                return(
                  <Menu.Item key={data.key}>
                  <Link to={data.path}>{data.label}</Link>
                </Menu.Item>
                )
              })
            ) 
          })}
        </Menu> */}
      </Sider>

      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Navbar /> {/* Add the Navbar component here */}
        <Content>
          <Content style={{ margin: "10px 10px 0", height: "100%" }}>
            <div
              className="site-layout-background"
              style={{ overflow: "hidden", minHeight: "100%" }}
            >
              <HomeRoutes />
            </div>
          </Content>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default MainLayout;
