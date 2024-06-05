import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { Card, List, Avatar } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined  } from '@ant-design/icons';
import { ReceitaService } from "../services/Receita";
import { CategoriaService } from "../services/Categoria";
import { IngredienteReceitaService } from '../services/IngredienteReceita'
import PageContent from '../componentes/PageContent/PageContent';
import convertImage64 from '../helpers/convertImage64';
import ContainerArraia from '../componentes/Arraia/ContainerArraia';

const { Meta } = Card;
const PAGE_NAME = 'Home';
const HEAD_NAME = 'Receitas Gourmet';
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

const Home = () => {
  /*  Consome as sessões e rotas */
  // const { data: session } = useSession();
  // const isAuthenticated = session ? true : false;
  // const router = useRouter();

  // /*  Carrega lista de receitas */
  // const [listaReceitas, setListaReceitas] = useState([]);
  // const [listaCategorias, setlistaCategorias] = useState([]);

  // async function getReceitas() {
  //   /**Busca Receitas */
  //   const receitas = await ReceitaService.listAll();
  //   setListaReceitas(receitas)
  // }
  
  // useEffect(() => {
  //   async function getCategorias() {
  //     /**Busca Categorias */
  //     const categorias = await CategoriaService.listAll();
  //     setlistaCategorias(categorias);
  //   }

  //   /*  Busca lista de receitas  ao carregar a tela*/
  //   async function getReceitas() {
  //     /**Busca Receitas */
  //     const receitas = await ReceitaService.listAll();
  //     setListaReceitas(receitas)
  //   }
    
  //   getCategorias()
  //   getReceitas()
  // })

  // async function removeItem(idReceita) {
  //   const responseIngALL = await IngredienteReceitaService.listAll();
  //   const ingredientes = responseIngALL.filter((item) => item.cod_receita == parseInt(idReceita)) || [];

  //   if (ingredientes && ingredientes?.length > 0) { 
      
  //     await ingredientes.forEach(element => {
  //       const responseIng = IngredienteReceitaService.remove(element.cod_ingred_receita);
  //     });
  //   }

  //   const responseRec = await ReceitaService.remove(idReceita);
  //   getReceitas();
  // }

  return (
    <>
      <ContainerArraia />
    </>
    // <PageContent headName={HEAD_NAME} pageName={PAGE_NAME} slider listas={listaCategorias}>
    //   {listaReceitas && 
    //     <List
    //       style={{marginTop: '24px'}}
    //       grid={{
    //         gutter: 8,
    //         xs: 1,
    //         sm: 2,
    //         md: 2,
    //         lg: 4,
    //         xl: 4,
    //         xxl: 6,
    //       }}
    //       header={`${listaReceitas?.length ? `${listaReceitas?.length} Receitas encontradas`: ''}`}
    //       dataSource={listaReceitas}
    //       renderItem={(item) => (
    //         <List.Item >
    //           <Card
    //             // title={item.nome_receita}
    //             hoverable={TYPE_USER !== 'admin'}// Defina a altura do Card
    //             cover={
    //               <img
    //                 alt="example"
    //                 src={convertImage64(item?.foto)}
    //                 style={{
    //                   width: '100%', // Defina a largura da imagem como 100%
    //                   height: '200px', // Defina a altura da imagem como 100%
    //                 }}
    //               />
    //             }
    //             onClick={() => !isAuthenticated || TYPE_USER !== 'admin' ? router.push(`/receitas/${item?.cod_receita}`) : null}
    //             actions={isAuthenticated  && TYPE_USER === 'admin' ? [
    //               <EditOutlined key="edit" onClick={() => router.push(`/receitas/cadastro/${item?.cod_receita}`)}/>, 
    //               <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>,
    //               <DeleteOutlined key="clouse" onClick={() => removeItem(item?.cod_receita)}/>
    //             ]:[
    //               <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>
    //             ]}
    //             size="small"
    //           >
    //             <Meta
    //               avatar={<Avatar >{item?.tempo_preparo} Min</Avatar>}
    //               title={item?.nome_receita}
    //               description={`Categoria: ${listaCategorias?.find((cat) => cat?.cod_categoria === item?.cod_categoria)?.nome}` || ''}
    //             />
    //           </Card>
    //         </List.Item>
    //       )}
    //     />
    //   }
    // </PageContent>
  );
};

export default Home;