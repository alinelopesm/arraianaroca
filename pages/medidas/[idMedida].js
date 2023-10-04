import React from 'react';
import { MedidaService } from "../../services/Medida"
import CadastroMedida from './cadastro';

const method = 'editar'

const AlteracaoMedida = ({medida}) => {
  const medidaData = medida
  console.log('Sou?', medidaData);

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