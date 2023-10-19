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
import ActiveLink from '../Router/ActiveLink'; // Importe o seu componente ActiveLink

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = ({ collapsed, isAuthenticated }) => {

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed} // Use `collapsed` instead of `inlineCollapsed`
      width={collapsed ? 80 : 200}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <ActiveLink href="/">Home</ActiveLink>
        </Menu.Item>
        {/* Menu Principal: Receitas */}
        {isAuthenticated &&
          <Menu.Item key="perfil" icon={<HomeOutlined />}>
            <ActiveLink href="/perfil">Perfil</ActiveLink>
          </Menu.Item>
        }
        <SubMenu
          key="receitas"
          icon={<HomeOutlined />}
          title="Receitas"
        >
          <Menu.Item key="lista-receitas">
            <ActiveLink href="/receitas">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="cadastro-receita">
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
            <Menu.Item key="cadastro-categoria">
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
            <Menu.Item key="cadastro-medida">
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
            <Menu.Item key="cadastro-ingrediente">
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
            <Menu.Item key="cadastro-usuario">
              <ActiveLink href="/signup">Cadastro</ActiveLink>
            </Menu.Item>
          </SubMenu>
        }
      </Menu>
    </Sider>
  );
};

export default SideBar;
