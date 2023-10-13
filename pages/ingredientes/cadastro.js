import React, { useState, useEffect } from 'react';
import PageContent from '../../componentes/PageContent/PageContent';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  Input,
  message,
} from 'antd';
import { IngredienteService } from "../../services/Ingrediente"
import { useRouter } from "next/router";

const PAGE_NAME = 'Cadastro de Ingrediente'
const HEAD_NAME = 'Ingredientes'

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

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CadastroIngrediente = ({ingredienteData}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [ingredienteForm, setIngredienteForm] = useState(ingredienteData)

  const onFinish = async (values) => {

    let payload = {
      nome: values?.nome,
    };

    if(ingredienteData?.codIngrediente) {
      const id = ingredienteData?.codIngrediente
      const edicaoIngrediente = await IngredienteService.update(payload, id);

      if (edicaoIngrediente) router.push('/ingredientes')
      return
    }

    const cadastroIngrediente = await IngredienteService.create(payload);
    router.push('/ingredientes')
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
          initialValue={ingredienteForm?.nome || ''}
          tooltip="Como você quer que os outros te chamem?"
          rules={[
            {
              required: true,
              message: 'Por favor, insira seu nome!',
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
              {ingredienteForm?.codIngrediente ? 'Alterar' : 'Salvar'}
            </Button>
            
          </Space>
        </Form.Item>
      </Form>
    </PageContent>
  );
};
export default CadastroIngrediente;
