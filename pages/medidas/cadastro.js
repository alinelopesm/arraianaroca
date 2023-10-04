import React, { useState, useEffect } from 'react';
import PageContent from '../../componentes/PageContent/PageContent';
import {
  Button,
  Form,
  Space,
  Input,
} from 'antd';
import { MedidaService } from "../../services/Medida"
import { useRouter } from "next/router";

const PAGE_NAME = 'Cadastro de Medidas'
const HEAD_NAME = 'Medidas'

const method = 'editar'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CadastroMedida = ({medidaData}) => {
  const router = useRouter();
  const [medidaForm, setCategoriaForm] = useState(medidaData)

  const onFinish = async (values) => {
    let payload = {
      nome: values?.nome,
      sigla: values.sigla,
    };

    if(medidaData?.cod_un_medida) {
      const id = medidaData?.cod_un_medida
      const edicaoCategoria = await MedidaService.update(payload, id);

      router.push('/medidas')
      return
    }

    const cadastroMedida = await MedidaService.create(payload);
    if (cadastroMedida) router.push('/medidas')
  };
  
  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="nome"
          label="Nome"
          initialValue={medidaForm?.nome || ''}
          tooltip="Nome de visualização da medida"
          rules={[
            {
              required: true,
              message: 'Por favor, insira um nome!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sigla"
          label="Sigla"
          initialValue={medidaForm?.sigla || ''}
          tooltip="Sigla de definição da medida"
          rules={[
            {
              required: true,
              message: 'Por favor, insira uma sigla!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          style={{
            display: 'flex',
            flexDirection: 'column', // Para empilhar os botões verticalmente
            alignItems: 'flex-end', // Para alinhar os botões à direita
          }}
        >
          <Space style={{ width: '100%' }}>
            <Button style={{ width: '100%' }} type='' htmlType="reset">Limpar</Button>
            <Button htmlType="submit" style={{background: '#1677ff', color: 'white', width: '100%' }}>
              {medidaForm?.cod_un_medida ? 'Alterar' : 'Salvar'}
            </Button>
            
          </Space>
        </Form.Item>
      </Form>
    </PageContent>
  );
};
export default CadastroMedida;
