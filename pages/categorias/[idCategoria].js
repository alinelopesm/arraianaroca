import React from 'react';
import { CategoriaService } from "../../services/Categoria"
import convertImage64 from '../../helpers/convertImage64'
import CadastroCategoria from './cadastro';
import Router, { useRouter } from 'next/router';

const method = 'editar'

const AlteracaoCategoria = ({categoria}) => {
  const categoriaData = {
    codCategoria: categoria?.cod_categoria,
    nome: categoria?.nome,
    imagePath: categoria?.foto_categoria,
    imagePreview: convertImage64(categoria?.foto_categoria)
  }

  return (
    categoriaData && <CadastroCategoria categoriaData={categoriaData} />
  );
};

export default AlteracaoCategoria;

export async function getServerSideProps({params}) {
  const { idCategoria } = params; 
  
  const response = await CategoriaService.get(idCategoria);
  const categoria = response[0] || {}

  return {
    props: {
      categoria,
    },
  };
}