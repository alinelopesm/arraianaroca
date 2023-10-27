import React, { useState } from 'react';
import Head from "next/head";
import { Layout } from 'antd';
import SideBar from '../SideBar/SideBar';
import HeaderScreen from '../Header/Header';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CategorySlider from '../Carrousel/CategorySlider'

const { Content } = Layout;

const PageContent = (props) => {
  const { headName, pageName, children } = props;
  const [collapsed, setCollapsed] = useState(true);
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const router = useRouter();

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
        { props.slider && 
          <div 
          style={{
            width: '100%',
            margin: '24px 0',
            padding: '0 0 0 48px',
          }} >
            <CategorySlider categorias={props.listas} />
          </div>}
        <Content
          style={{
            margin: '24px 16px 24px 66px',
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
