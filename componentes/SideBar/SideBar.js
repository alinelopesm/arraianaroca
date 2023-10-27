import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  BookOutlined,
  BarsOutlined,
  UserOutlined,
  PlusOutlined,
  ContainerOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import ActiveLink from '../Router/ActiveLink';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = ({ collapsed, isAuthenticated }) => {

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={collapsed ? 80 : 200}
      theme="light"
      breakpoint="lg"
      collapsedWidth="50"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: '72px',
        bottom: 0,
        zIndex: 9999999999,

      }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <ActiveLink href="/">Home</ActiveLink>
        </Menu.Item>
        {isAuthenticated &&
          <Menu.Item key="perfil" icon={<UserOutlined />}>
            <ActiveLink href="/perfil">Perfil</ActiveLink>
          </Menu.Item>
        }
        <SubMenu
          key="receitas"
          icon={<AppstoreOutlined />}
          title="Receitas"
        >
          <Menu.Item key="lista-receitas">
            <ActiveLink href="/receitas">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="cadastro-receita" icon={<PlusOutlined />}>
              <ActiveLink href="/receitas/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Categorias */}
        <SubMenu
          key="categorias"
          icon={<BookOutlined />}
          title="Categorias"
        >
          <Menu.Item key="lista-categorias">
            <ActiveLink href="/categorias">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="cadastro-categoria" icon={<PlusOutlined />}>
              <ActiveLink href="/categorias/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Medidas */}
        <SubMenu
          key="medidas"
          icon={<ContainerOutlined />}
          title="Medidas"
        >
          <Menu.Item key="lista-medidas">
            <ActiveLink href="/medidas">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="cadastro-medida" icon={<PlusOutlined />}>
              <ActiveLink href="/medidas/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Ingredientes */}
        <SubMenu
          key="ingredientes"
          icon={<UnorderedListOutlined />}
          title="Ingredientes"
        >
          <Menu.Item key="lista-ingredientes">
            <ActiveLink href="/ingredientes">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="cadastro-ingrediente" icon={<PlusOutlined />}>
              <ActiveLink href="/ingredientes/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Usuários */}
        {isAuthenticated && <SubMenu
            key="usuarios"
            icon={<UserOutlined />}
            title="Usuários"
          >
            <Menu.Item key="lista-usuarios">
              <ActiveLink href="/usuarios">Listagem</ActiveLink>
            </Menu.Item>
            <Menu.Item key="cadastro-usuario" icon={<UserAddOutlined />}>
              <ActiveLink href="/signup">Cadastro</ActiveLink>
            </Menu.Item>
          </SubMenu>
        }
      </Menu>
    </Sider>
  );
};

export default SideBar;
