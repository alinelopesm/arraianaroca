import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import AlteracaoUsuarioDetails from './alteracao';
import { UsuarioService } from "../../services/Usuario";
import convertImage64 from '../../helpers/convertImage64';
import AdminOnly from '../../componentes/PegeAlerts/NoAdmin';

const method = 'editar'
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER;

const AlteracaoUsuario = ({ usuario }) => {
  const [usuarioData, setUsuarioData] = useState(null);
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false;
  const router = useRouter();

  useEffect(() => {
    if (usuario) {
      const newUser = {
        codUsuario: usuario?.cod_usuario,
        nome: usuario?.nome,
        email: usuario?.email || '',
        senha: usuario?.senha,
        telefone: usuario.telefone,
        foto_usuario: usuario?.foto_usuario,
        imagePreview: convertImage64(usuario?.foto_usuario)
      }

      setUsuarioData(newUser);
    }
  }, [usuario]);

  return (
    isAuthenticated &&
    ((usuario?.cod_usuario == session.user.id || session?.token?.sub) || (TYPE_USER === 'admin')) ? (
      usuarioData ? <AlteracaoUsuarioDetails usuarioData={usuarioData} isUserOwner={usuario?.cod_usuario === session.user.id || session?.token?.sub}/> : null
    ) : (
      <AdminOnly />
    )
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