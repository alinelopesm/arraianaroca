import React from 'react';
import SignUp from '../signup'
import { UsuarioService } from "../../services/Usuario"
import convertImage64 from '../../helpers/convertImage64'

const method = 'editar'

const AlteracaoUsuario = ({usuario}) => {
  const usuarioData = {
    codUsuario: usuario?.cod_usuario,
    nome: usuario?.nome,
    email: usuario?.email || '',
    senha: usuario?.senha,
    telefone: usuario.telefone,
    foto_usuario: usuario?.foto_usuario, 
    imagePreview: convertImage64(usuario?.foto_usuario)
  }

  return (
    usuarioData && <SignUp usuarioData={usuarioData} />
  );
};

export default AlteracaoUsuario;

export async function getServerSideProps({params}) {
  const { idUsuario } = params; 
  
  const response = await UsuarioService.get(idUsuario);
  const usuario = response[0] || {}

  return {
    props: {
      usuario,
    },
  };
}