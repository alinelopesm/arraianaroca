import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  Upload,
  Input,
  message,
  Image
} from 'antd';
import { CategoriaService } from "../../services/Categoria"
import convertImage64 from '../../helpers/convertImage64'
import CadastroCategoria from './cadastro';

const method = 'editar'

const AlteracaoCategoria = ({categoria}) => {
  return (
    <CadastroCategoria categoria={categoria} />
  );
};

export default AlteracaoCategoria;

export async function getStaticProps(context){
  console.log('E ai? params ', context.params);
  const { categoriaId } = context.params
  const response = await CategoriaService.get(categoriaId);
  console.log('E ai?', response);

  const categoria = {
    codCategoria: response[0].cod_categoria,
    nome: response[0].nome,
    imagePath: response[0].foto_categoria,
    imagePreview: convertImage64(response[0].foto_categoria)
  }
  return {
    props: {
      categoria
    }
  }
}
