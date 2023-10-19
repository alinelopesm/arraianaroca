import React from 'react';
import CadastroIngrediente from './cadastro';
import { IngredienteService } from "../../services/Ingrediente"

const method = 'editar'

const AlteracaoIngrediente = ({ingrediente}) => {
  const ingredienteData = {
    codIngrediente: ingrediente?.cod_ingrediente,
    nome: ingrediente?.nome,
  }

  return (
    ingredienteData && <CadastroIngrediente ingredienteData={ingredienteData} />
  );
};

export default AlteracaoIngrediente;

export async function getServerSideProps({params}) {
  const { idIngrediente } = params; 
  
  const response = await IngredienteService.get(idIngrediente);
  const ingrediente = response[0] || {}

  return {
    props: {
      ingrediente,
    },
  };
}