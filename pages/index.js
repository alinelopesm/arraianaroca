import React, { useState, useEffect } from "react";
import PageContent from '../componentes/PageContent/PageContent';
import { ReceitaService } from "../services/Receita"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { Card, List, Avatar} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const type_user = 'admin'

const PAGE_NAME = 'Home'

const Home = ({ Component, pageProps }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [listaReceitas, setListaReceitas] = useState([])

  const isAuthenticated = session ? true : false

  useEffect(() => {
    async function getReceitas() {
      const receitas = await ReceitaService.listAll()
      setListaReceitas(receitas)
    }
    
    getReceitas()
  })

  return (
    <PageContent pageProps={pageProps} pageName={PAGE_NAME}>
      <h1>Receitas</h1>

      <List
        style={{marginTop: '48px'}}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 4,
          xxl: 3,
        }}
        header={`${listaReceitas.length ? `${listaReceitas?.length} Receitas encontradas`: ''}`}
        dataSource={listaReceitas}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ width: 200 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={type_user === 'admn' ? [
                <EditOutlined key="edit" />,
              ]: null}
            >
              <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title={item.nome_receita}
              />
            </Card>
          </List.Item>
        )}
      />
    </PageContent>
  );
};

export default Home;
