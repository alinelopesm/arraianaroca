import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { Card, List, Avatar, Image } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ReceitaService } from "../services/Receita";
import PageContent from '../componentes/PageContent/PageContent';
import convertImage64 from '../helpers/convertImage64'

const { Meta } = Card;
const PAGE_NAME = 'Home'
const HEAD_NAME = 'Receitas Gourmet'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER 

const Home = () => {
  /*  Consome as sessões e rotas */
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const router = useRouter();

  /*  Carrega lista de receitas */
  const [listaReceitas, setListaReceitas] = useState([])
  
  useEffect(() => {
    /*  Busca lista de receitas  ao carregar a tela*/
    async function getReceitas() {
      const receitas = await ReceitaService.listAll()
      setListaReceitas(receitas)
    }
    getReceitas()
  })

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <h1>Receitas</h1>
      <List
        style={{marginTop: '48px'}}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        header={`${listaReceitas.length ? `${listaReceitas?.length} Receitas encontradas`: ''}`}
        dataSource={listaReceitas}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable={TYPE_USER !== 'admin'}
              cover={
                <img
                  alt="example" src={convertImage64(item?.foto)}
                />
              }
              onClick={() => !isAuthenticated || TYPE_USER !== 'admin' ? router.push(`/receitas/${item?.cod_receita}`) : null}
              actions={isAuthenticated  && TYPE_USER === 'admin' ? [
                <EditOutlined key="edit" onClick={() => router.push(`/receitas/cadastro/${item?.cod_receita}`)}/>, 
                <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>
              ]: null}
            >
              <Meta
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