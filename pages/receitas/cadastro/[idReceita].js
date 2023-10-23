import React from 'react';
import { getSession } from "next-auth/react";
import { MedidaService } from "../../../services/Medida";
import { IngredienteService } from '../../../services/Ingrediente';
import { CategoriaService } from '../../../services/Categoria';
import CadastroReceita from '.';
import { ReceitaService } from "../../../services/Receita"
import { IngredienteReceitaService } from '../../../services/IngredienteReceita';
import convertImage64 from '../../../helpers/convertImage64'

const method = 'editar'

const AlteracaoReceita = ({ receita, ingredientes, userId, categoriaOptions, ingredientesOptions, medidasOptions }) => {
  const items = ingredientes || []
  const foto = convertImage64(receita?.foto)
  const receitaData = {...receita, items, foto}

  return (
    receitaData && 
      <CadastroReceita 
        receitaData={receitaData} 
        userId={userId}
        categoriaOptions={categoriaOptions}
        ingredientesOptions={ingredientesOptions}
        medidasOptions={medidasOptions}
      />
  );
};

export default AlteracaoReceita;

export async function getServerSideProps(context) {
  const { idReceita } = context.params; 
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin", // Redirecionar para a página de login se o usuário não estiver autenticado
        permanent: false,
      },
    };
  }

  const userId = session?.token?.sub
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
      userId,
      categoriaOptions,
      ingredientesOptions,
      medidasOptions,
      receita,
      ingredientes
    },
  };
}