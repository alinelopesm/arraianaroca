import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Button, Menu, Dropdown, Avatar, Row, Col, theme, Typography } from 'antd';
import { useSession } from 'next-auth/react';

const { Header } = Layout;

export default function HeaderScreen({ collapsed, setCollapsedCallback, pageName}) {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const headerStyle = {
    background: `url(/logoCompactoDark.png)`, // Defina a imagem do logo como plano de fundo
    backgroundSize: '100% 80px', // Ajusta o tamanho da imagem para cobrir o cabeçalho
    backgroundRepeat: 'no-repeat', // Não repete a imagem
    backgroundPosition: 'center', // Centraliza a imagem

    // O restante do seu estilo do cabeçalho permanece inalterado
    padding: 0,
    position: 'sticky',
    top: 0,
    zIndex: 9999999999,
    width: '100%',
    borderBottom: '1px solid #f0f0f0',
    // display: 'flex',
    alignItems: 'center',
    height: '80px'
  };
  

  // Opções do menu de usuário
  const userMenu = (
    <Menu>
      {!isAuthenticated && <>
        <Menu.Item key="login">
          <a href="/api/auth/signin">
            <LoginOutlined /> Login
          </a>
        </Menu.Item>
        <Menu.Item key="login">
        <a href="/signup">
          <LoginOutlined /> Cadastrar
        </a>
      </Menu.Item>
      </>}
      {isAuthenticated && <>
        <Menu.Item key="profile">
          <a href="/profile">
            <UserOutlined /> Perfil
          </a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a href="/api/auth/signout">
          <LogoutOutlined />  Logout
          </a>
        </Menu.Item>
      </>}
    </Menu>
  );

  return (
    <Header
      style={headerStyle}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsedCallback(!collapsed)}
            style={{
              fontSize: '16px',
              color: 'white',
              width: 50,
              height: 75,
            }}
          />
          <span style={{ color: 'white' }}>{pageName || ''}</span>
        </Col>
        <Row style={{paddingRight: '24px', gap: '8px', direction: 'revert', alignItems: 'center'}}>
          <Typography style={{color: 'white'}}>{(session && session?.user?.name) || 'Fazer Login'}</Typography>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Button
              type="text"
              icon={<Avatar size="small" color='white' icon={<UserOutlined />} />}
            />
          </Dropdown>
        </Row>
      </Row>
      
    </Header>
  );
};

// export default HeaderScreen;

