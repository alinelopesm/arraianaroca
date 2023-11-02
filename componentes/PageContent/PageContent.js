import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from "next/head";
import SideBar from '../SideBar/SideBar';
import HeaderScreen from '../Header/Header';
import CategorySlider from '../Carrousel/CategorySlider';
import { Layout } from 'antd';

const { Content } = Layout;

const PageContent = (props) => {
  const { headName, pageName, children, slider, listas } = props;
  const [collapsed, setCollapsed] = useState(true);
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false;

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
        { slider && listas &&
          <div 
            style={{
              width: '100%',
              margin: '24px 0',
              padding: '0 0 0 48px',
            }} 
          >
            <CategorySlider categorias={listas} />
          </div>
        }
        { children &&
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
        }
      </Layout>
    </Layout>
  );
};

export default PageContent;
