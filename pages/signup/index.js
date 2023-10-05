import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
} from 'antd';
import { UsuarioService } from "../../services/Usuario"
import { useRouter } from "next/router";

const PAGE_NAME = 'Cadastro de usuário'
const HEAD_NAME = 'Usuário'

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
const SignUp = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    delete values['confirm-senha']
    const cadastroUser = await UsuarioService.create(values)

    router.push('/signup/login')
  };
  
  return (
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
        <Form.Item
          name="nome"
          label="Nome"
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
            Register
          </Button>
        </Form.Item>
      </Form>
  );
};
export default SignUp;