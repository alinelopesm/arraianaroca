import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { CategoriaService } from "../../services/Categoria"
import { ReceitaService } from "../../services/Receita";
import convertImage64 from '../../helpers/convertImage64'
import PageContent from "../../componentes/PageContent/PageContent";
import { Row, Button, Avatar, List, Card, Typography, Image, Divider } from "antd";
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const method = 'editar'
const { Meta } = Card;
const { Title, Text } = Typography;
const PAGE_NAME = 'Listagem de Receitas por Categoria';
const HEAD_NAME = 'Categorias e receitas';
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

const AlteracaoCategoria = ({categoria, receitasFilter}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false;

  const categoriaData = {
    codCategoria: categoria?.cod_categoria,
    nome: categoria?.nome,
    imagePath: categoria?.foto_categoria,
    imagePreview: convertImage64(categoria?.foto_categoria)
  }
  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME} >
      <Title level={3}>Categoria: {categoriaData.nome}</Title>
      <Image preview={false} style={{padding:0 , margin: 0}} src={categoriaData.imagePreview} alt={categoriaData.nome} width='100%' height='300px' />
      <Divider />
      
      <Row gutter={16}>
        <List
          style={{marginTop: '-16px'}}
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
          header={`${receitasFilter.length ? `${receitasFilter?.length} Receitas encontradas`: ''}`}
          dataSource={receitasFilter}
          renderItem={(item) => (
            <List.Item >
              <Card
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
                actions={isAuthenticated  && TYPE_USER === 'admin' ? [
                  <EditOutlined key="edit" onClick={() => router.push(`/receitas/cadastro/${item?.cod_receita}`)}/>, 
                  <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>
                ]:[
                  <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>
                ]}
                size="small"
              >
                <Meta
                  avatar={<Avatar >{item?.tempo_preparo} Min</Avatar>}
                  title={item.nome_receita}
                  description={`Categoria: ${categoriaData.nome}` || ''}
                />
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </PageContent>
  );
};

export default AlteracaoCategoria;

export async function getServerSideProps({params}) {
  const { idCategoria } = params; 
  
  const response = await CategoriaService.get(idCategoria);
  const categoria = response[0] || {}

  const receitas = await ReceitaService.listAll();
  const receitasFilter = await receitas?.filter((item) => item?.cod_categoria === categoria.cod_categoria)

  return {
    props: {
      categoria,
      receitasFilter
    },
  };
}