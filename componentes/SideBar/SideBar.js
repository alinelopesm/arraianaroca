import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const SideBar = ({collapsed}) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Receitas',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'Medidas',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'Ingredientes',
          },
        ]}
      />
    </Sider>
  );
};
export default SideBar;