// pages/login.js
import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UsuarioService } from "../../services/Usuario"
import { useRouter } from "next/router";
import { useAuth } from '../../auth/auth-context';

const PAGE_NAME = 'Cadastro de usuário'
const HEAD_NAME = 'Usuário'

export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    const user = await authenticateUser(values.username, values.password);

    if (user) {
      // Autenticação bem-sucedida, chame a função login do contexto de autenticação
      login();

      // Redirecionar o usuário para a página de destino após a autenticação bem-sucedida
      router.push('/dashboard');
    } else {
      // Exibir uma mensagem de erro ou tratar o erro de autenticação
      form.setFields([
        {
          name: 'password',
          errors: ['Usuário ou senha incorretos'],
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Usuário"
          name="username"
          rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Entrar
          </Button>
          <Button onClick={() => router.push('/signup')} loading={loading}>
            Me Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
