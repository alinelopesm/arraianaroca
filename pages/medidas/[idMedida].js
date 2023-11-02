import React from 'react';
import { MedidaService } from "../../services/Medida"
import CadastroMedida from './cadastro';

const method = 'editar'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

const AlteracaoMedida = ({medida}) => {
  const medidaData = medida;

  return (
    medidaData && <CadastroMedida medidaData={medidaData} />
  );
};

export default AlteracaoMedida;

export async function getServerSideProps({params}) {
  const { idMedida } = params; 
  
  const response = await MedidaService.get(idMedida);
  const medida = response[0] || {}

  return {
    props: {
      medida,
    },
  };
}