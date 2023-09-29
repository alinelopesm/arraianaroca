import React, { useState } from 'react';
import Head from "next/head"
import { Layout } from 'antd';
import SideBar from '../SideBar/SideBar';
import HeaderScreen from '../Header/Header';
import { useRouter } from 'next/router';

const { Content } = Layout;

const PageContent = ({ pageProps, headName, pageName, children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{headName || pageName || 'Receitas Gourmet'}</title>
      </Head>
      <SideBar collapsed={collapsed} />
      <Layout>
        <HeaderScreen
          collapsed={collapsed}
          setCollapsedCallback={(value) => setCollapsed(value)}
          pageName={pageName}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 600,
            background: 'white'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageContent;
