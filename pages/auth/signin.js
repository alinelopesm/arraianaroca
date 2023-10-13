// pages/auth/signin.js

import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"; // Use signIn em vez de authorize
import { Form, Input, Button } from "antd";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const username = values.username;
    const password = values.password;

    const result = await signIn("Credentials", {
      username,
      password,
      redirect: false, // Evite o redirecionamento automático
    });

    if (result.error) {
      setError("Usuário ou senha incorretos.");
    } else {
      router.push("/dashboard"); // Redirecione para o painel após o login bem-sucedido
    }

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form form={form} name="login" initialValues={{ remember: true }} onFinish={onFinish}>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button onClick={() => router.push('/signup')} loading={loading}>
            Me Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInPage;
