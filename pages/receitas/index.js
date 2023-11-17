import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import { Row, Button, Avatar, List, Card, Typography } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import PageContent from "../../componentes/PageContent/PageContent";
import { ReceitaService } from "../../services/Receita";
import { CategoriaService } from "../../services/Categoria";
import { IngredienteReceitaService } from '../../services/IngredienteReceita'
import convertImage64 from '../../helpers/convertImage64';

const { Meta } = Card;
const { Title } = Typography;
const PAGE_NAME = 'Listagem de Receitas';
const HEAD_NAME = 'Receitas';
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

export default function Receitas() {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false;

  const router = useRouter();
  const [listaReceitas, setListaReceitas] = useState([]);
  const [listaCategorias, setlistaCategorias] = useState([])

  async function getReceitas() {
    const receitas = await ReceitaService.listAll();
    setListaReceitas(receitas);

    const categorias = await CategoriaService.listAll();
    setlistaCategorias(categorias);
  }

  useEffect(() => {
    getReceitas();
  })

  async function removeItem(idReceita) {
    const responseIngALL = await IngredienteReceitaService.listAll();
    const ingredientes = responseIngALL.filter((item) => item.cod_receita == parseInt(idReceita)) || [];

    if (ingredientes && ingredientes?.length > 0) { 
      
      await ingredientes.forEach(element => {
        const responseIng = IngredienteReceitaService.remove(element.cod_ingred_receita);
      });
    }

    const responseRec = await ReceitaService.remove(idReceita);
    getReceitas();
  }

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME} >
      <Row gutter={16} justify='end'>
        {isAuthenticated &&
          <Button
            style={{ background: '#1677ff', color: 'white', zIndex: 3 }}
            onClick={() => router.push('/receitas/cadastro')}
          >
            Cadastrar Nova Receita
          </Button>
        }
      </Row>
      
      <Row gutter={16}>
        <List
          style={{marginTop: '-36px', width: `100%`}}
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
          header={`${listaReceitas?.length ? `${listaReceitas?.length} Receitas encontradas`: ''}`}
          dataSource={listaReceitas}
          renderItem={(item) => (
            <List.Item style={{ width: `100%`}}>
              <Card
              style={{ width: `100%`}}
                hoverable={TYPE_USER !== 'admin'}// Defina a altura do Card
                cover={
                  <img
                    alt="example"
                    src={convertImage64(item?.foto)}
                    style={{
                      width: '100%', // Defina a largura da imagem como 100%
                      height: '200px', // Defina a altura da imagem como 100%
                    }}
                  />
                }
                onClick={() => !isAuthenticated || TYPE_USER !== 'admin' ? router.push(`/receitas/${item?.cod_receita}`) : null}
                actions={isAuthenticated  && (TYPE_USER === 'admin' || session?.user?.id === item.cod_usuario) ? [
                  <EditOutlined key="edit" onClick={() => router.push(`/receitas/cadastro/${item?.cod_receita}`)}/>, 
                  <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>,
                  <DeleteOutlined key="clouse" onClick={() => removeItem(item?.cod_receita)}/>
                ]: <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>}
                size="small"
              >
                <Meta
                  avatar={<Avatar >{item?.tempo_preparo} Min</Avatar>}
                  title={item.nome_receita}
                  description={`Categoria: ${listaCategorias?.find((cat) => cat?.cod_categoria === item?.cod_categoria)?.nome}` || ''}
                />
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </PageContent>
  )
}

