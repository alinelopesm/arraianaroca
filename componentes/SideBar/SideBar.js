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
      collapsed={collapsed}
      width={collapsed ? 80 : 200}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} inlineCollapsed={collapsed}>

        {/* Menu Principal: Receitas */}
        <SubMenu
          key="sub1"
          icon={<HomeOutlined />}
          title="Receitas"
        >
          <Menu.Item key="1">
            <ActiveLink href="/receitas">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="2">
              <ActiveLink href="/receitas/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Categorias */}
        <SubMenu
          key="sub2"
          icon={<BookOutlined />}
          title="Categorias"
        >
          <Menu.Item key="3">
            <ActiveLink href="/categorias">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="4">
              <ActiveLink href="/categorias/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Medidas */}
        <SubMenu
          key="sub3"
          icon={<ContainerOutlined />}
          title="Medidas"
        >
          <Menu.Item key="5">
            <ActiveLink href="/medidas">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="6">
              <ActiveLink href="/medidas/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Ingredientes */}
        <SubMenu
          key="sub4"
          icon={<UnorderedListOutlined />}
          title="Ingredientes"
        >
          <Menu.Item key="7">
            <ActiveLink href="/ingredientes">Listagem</ActiveLink>
          </Menu.Item>
          {isAuthenticated &&
            <Menu.Item key="8">
              <ActiveLink href="/ingredientes/cadastro">Cadastro</ActiveLink>
            </Menu.Item>
          }
        </SubMenu>

        {/* Menu Principal: Usuários */}
        {isAuthenticated && <SubMenu
            key="sub5"
            icon={<UserOutlined />}
            title="Usuários"
          >
            <Menu.Item key="9">
              <ActiveLink href="/usuarios">Listagem</ActiveLink>
            </Menu.Item>
            <Menu.Item key="10">
              <ActiveLink href="/signup">Cadastro</ActiveLink>
            </Menu.Item>
          </SubMenu>
        }

      </Menu>
    </Sider>
  );
};

export default SideBar;
