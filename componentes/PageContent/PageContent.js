import React, { useState } from 'react';
import Head from "next/head"
import { Layout } from 'antd';
import SideBar from '../SideBar/SideBar';
import HeaderScreen from '../Header/Header';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const { Content } = Layout;


const PageContent = ({ headName, pageName, children}) => {
  const [collapsed, setCollapsed] = useState(true);
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const router = useRouter();
  const tipoUser = 'admin'

  return (
    <Layout>
      <Head>
        <title>{headName || pageName || 'Receitas Gourmet'}</title>
      </Head>
      <SideBar collapsed={collapsed} isAuthenticated={isAuthenticated}/>
      <Layout>
        <HeaderScreen
          collapsed={collapsed}
          setCollapsedCallback={(value) => setCollapsed(value)}
          pageName={pageName}
          isAuthenticated={isAuthenticated}
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
