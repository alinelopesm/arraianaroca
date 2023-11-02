import React, { useState } from 'react';
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
import { UsuarioService } from "../../../services/Usuario"
import PageContent from '../../../componentes/PageContent/PageContent';
import { useRouter } from "next/router";

const PAGE_NAME = 'Cadastro de usuário'
const HEAD_NAME = 'Usuário'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const AlteracaoUsuarioDetails = ({ pageProps, usuarioData, isUserOwner }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const propsForm = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    imagePreview: usuarioData?.imagePreview,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImagePreview(imagePath= `${info.file.thumbUrl}`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onFinish = async (values) => {
    delete values['confirm-senha']
    
    let payload = {
      nome: usuarioData?.nome,
      email: usuarioData?.email || '',
      senha: usuarioData?.senha,
      telefone: usuarioData?.telefone,
    };

    if(usuarioData?.codUsuario) {
      const file = values?.dragger?.length > 0 && values?.dragger[0]?.thumbUrl || '';
      const imagePreview = `${file}`

      payload.foto_usuario = imagePreview
      const id = usuarioData?.codUsuario
      const edicaoUser = await UsuarioService.update(payload, id);

      if (edicaoUser) {
        if (TYPE_USER === 'admin') {
          router.push('/usuarios')
          return
        }
        
        router.push('/perfil')
      }
      return
    }
  };
  
  return (
    <PageContent pageProps={pageProps} pageName={PAGE_NAME}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      > 
        {usuarioData?.codUsuario &&
          <>
            <Form.Item label='ImagePreview'>
              <Image
                width={200}
                src={usuarioData?.imagePreview}
              />
            </Form.Item>

            <Form.Item label="Dragger">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger props={propsForm} name="files" listType="picture">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined /> 
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </>
        }
        <Form.Item
          name="nome"
          label="Nome"
          initialValue={usuarioData?.nome || ''}
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
          name="email"
          label="E-mail"
          initialValue={usuarioData?.email || ''}
          rules={[
            {
              type: 'email',
              message: 'E-mail inválido!',
            },
            {
              required: true,
              message: 'Por favor insira seu E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="senha"
          label="senha"
          initialValue={usuarioData?.senha|| ''}
          rules={[
            {
              required: true,
              message: 'Por favor insira uma senha!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm-senha"
          label="Confirmação de senha"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor confirme sua senha!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('confirm-senha') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('A nova senha que você digitou não corresponde!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="telefone"
          label="Celular"
          initialValue={usuarioData?.telefone}
          rules={[
            {
              required: true,
              message: 'Please insira um numero de telefone!',
            },
          ]}
        >
          <Input
          type='phone'
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit">
            {usuarioData?.codUsuario ? 'Alterar' : 'Salvar'}
          </Button>
        </Form.Item>
      </Form>
    </PageContent>
  );
};
export default AlteracaoUsuarioDetails;