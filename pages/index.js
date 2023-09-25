// import Head from "next/head"
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import SideBar from '../componentes/SideBar/SideBar'
import HeaderScreen from '../componentes/Header/Header'


const { Content } = Layout;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
      <SideBar collapsed={collapsed} />
      <Layout>
        <HeaderScreen collapsed={collapsed} setCollapsedCallback={(value) => setCollapsed(value)} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;