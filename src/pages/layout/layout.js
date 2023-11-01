import React, { useEffect, useState } from "react";
import { HomeRoutes } from "../../routes/index";

import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";
import HClogo from "./HClogo.png";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function Navbar({ formattedDate }) {
  return (
    <Header
      style={{
        backgroundColor: "#222",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div style={{ color: "white", fontSize: "25px" }}>{formattedDate}</div>

      {/* <h1 style={{ color: "white", fontSize: "35px", margin: "0" }}>
        ADVANCED REHAB & HEALTHCARE OF LIVE OAK
      </h1> */}
      <h1
        style={{
          color: "white",
          fontSize: "35px",
          margin: "0",
          fontWeight: "bold",
        }}
      >
        ADVANCED REHAB & HEALTHCARE OF LIVE OAK
      </h1>
    </Header>
  );
}

const items = [
  getItem("User", "sub1", <UserOutlined />, [
    getItem("POPULATION", "population"),
    getItem("IMMUNIZATION", "immunization"),
    getItem("ASSESSMENT", "assessment"),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:9090/findall")
      .then((response) => response.json())
      .then((data) => {
        // ... Your data retrieval logic ...

        const billingDate = data.length > 0 && data[0].billing_DATE;
        const formattedDate = formatDate(billingDate);
        setFormattedDate(formattedDate); // Set the state
      });
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = date.getFullYear().toString().substr(-2);
    const month = monthNames[date.getMonth()];

    return month + "-" + year;
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function handleClick(e) {
    // setCurrent(e.key);
    navigate(
      e === "population"
        ? "/percentageView"
        : e === "assessment"
        ? "/assessmentView"
        : "/"
    );
  }

  return (
    <Layout
      style={{
        //height: "100vh",
        backgroundColor: "rgb(34, 34, 34)",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "rgb(34, 34, 34)",height:"100vh" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(e) => handleClick(e.key)}
          style={{ backgroundColor: "rgb(34, 34, 34)" }}
        />

        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              // flex: "1",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <img src={HClogo} alt="Your Image" width="100%" />
          </div>
        </div>
      </Sider>

      <Layout>
        {formattedDate && <Navbar formattedDate={formattedDate} />}
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
