import React, { useState } from 'react';
import { HomeRoutes } from '../../routes/index';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Chart } from "react-google-charts";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Pie Chart', '1', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Profile', '3'),
    getItem('Setting', '4'),
    getItem('Account Manage', '5'),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
         <Content>
			  <Content style={{ margin: '10px 10px 0', height: '100%' }}>
					<div className="site-layout-background" style={{  overflow: 'hidden', minHeight: '100%' }}>
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
