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

const HeaderScreen = ({ collapsed, setCollapsedCallback, pageName}) => {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Simule um usuário autenticado para este exemplo
  

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
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsedCallback(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          {pageName || ''}
        </Col>
        <Row style={{paddingRight: '24px', gap: '8px', direction: 'revert', alignItems: 'center'}}>
          <Typography >{(session && session?.user?.name) || 'Fazer Login'}</Typography>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Button
              type="text"
              icon={<Avatar size="small" icon={<UserOutlined />} />}
            />
          </Dropdown>
        </Row>
      </Row>
      
    </Header>
  );
};

export default HeaderScreen;