// import React, { useState } from 'react';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { Chart } from "react-google-charts";

// const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   getItem('Pie Chart', '1', <PieChartOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Profile', '3'),
//     getItem('Setting', '4'),
//     getItem('Account Manage', '5'),
//   ]),
// ];

// const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7],
// ];

// const options = {
//   title: "My Daily Activities",
//   is3D: true,
// };
// const Login = () => {
//   const [collapsed, setCollapsed] = useState(true);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <div
//     style={{
//       padding: 24,
//       minHeight: 650,
//       background: colorBgContainer,
//     }}
//   >
//     <Chart
//   chartType="PieChart"
//   data={data}
//   options={options}
//   width={"100%"}
//   height={"400px"}
// />
//   </div>
//   );
// };
// export default Login;
