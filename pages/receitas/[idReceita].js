import React from 'react';
import { getSession } from "next-auth/react";
import { Card, Typography, Image, List, Tag, Divider } from "antd";
import { MedidaService } from "../../services/Medida";
import { IngredienteService } from '../../services/Ingrediente';
import { CategoriaService } from '../../services/Categoria';
import CadastroReceita from './cadastro/index';
import { ReceitaService } from "../../services/Receita"
import { IngredienteReceitaService } from '../../services/IngredienteReceita';
import PageContent from '../../componentes/PageContent/PageContent';
import convertImage64 from '../../helpers/convertImage64'

const PAGE_NAME = 'Detalhes da Receita'
const HEAD_NAME = 'Receitas'
const method = 'editar'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

const { Title, Text } = Typography;

const ViewAlteracaoReceita = ({ receita, ingredientes, userIdServer, categoriaOptions, ingredientesOptions, medidasOptions }) => {
  const items = ingredientes || []
  const foto = convertImage64(receita?.foto)
  const receitaData = {...receita, items, foto}
  const categoria = categoriaOptions.find((categ) => categ.value === receitaData.cod_categoria).label;

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <Card
          title={receitaData.nome_receita}
          extra={
            <div>
              <Tag color="blue">Categoria: {categoria}</Tag>
              <Tag color="green">Tempo de Preparo: {receitaData.tempo_preparo} min</Tag>
            </div>
          }
          style={{width: '100%'}}
        >
          <Image style={{padding:0 , margin: 0}} src={receitaData.foto} alt={receitaData.nome_receita} width='20%' height='300px' />
          <Divider />
          <Title level={3}>Ingredientes:</Title>
          <List
            dataSource={receitaData.items}
            renderItem={(item) => {
              const medida = medidasOptions.find((medida) => medida.value === item.cod_un_medida).label
              const ingrediente = ingredientesOptions.find((ingred) => ingred.value === item.cod_ingrediente).label
             return <List.Item>
                <Text>
                  {item.quantidade} - {medida} de : <b>{ingrediente}</b>
                </Text>
              </List.Item>
            }}
          />
          <Divider />
          <Title level={3}>Modo de Preparo:</Title>
          <Text>{receitaData.modo_preparo}</Text>
        </Card>
      </div>
    </PageContent>
  );
};

export default ViewAlteracaoReceita;

export async function getServerSideProps(context) {
  const { idReceita } = context.params; 
  const session = await getSession(context);

  const userIdServer = session?.user?.id || session?.token?.sub || null
  const listaCategorias = await CategoriaService.listAll();
  const listaIngredientes = await IngredienteService.listAll();
  const listaMedidas = await MedidaService.listAll();

  const categoriaOptions = listaCategorias.map((item) => {
    return {value: item.cod_categoria, label: item.nome}
  })

  const ingredientesOptions = listaIngredientes.map((item) => {
    return {value: item.cod_ingrediente, label: item.nome}
  })

  const medidasOptions = listaMedidas .map((item) => {
    return {value: item.cod_un_medida, label: item.nome}
  })
  
  const responseReceita = await ReceitaService.get(idReceita);
  const receita = responseReceita[0] || {}

  const responseIng = await IngredienteReceitaService.listAll();
  const ingredientes = responseIng.filter((item) => item.cod_receita == parseInt(idReceita)) || []

  return {
    props: {
      userIdServer,
      categoriaOptions,
      ingredientesOptions,
      medidasOptions,
      receita,
      ingredientes
    },
  };
}