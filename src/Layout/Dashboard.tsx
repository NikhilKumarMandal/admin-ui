import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/store'
import {  Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import Logo from '../components/icons/Logo';
import Icon, { BellFilled } from '@ant-design/icons';
import Home from '../components/icons/Home';
import FoodIcons from "../components/icons/FoodIcons"
import BasketIcon from '../components/icons/BasketIcon';
import GiftIcon from '../components/icons/GiftIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../http/api';

const items = [
    {
        key: "/",
        icon: <Icon component={Home} />,
        label: <NavLink to="/">Home</NavLink>
    },
    {
        key: '/users',
        icon: <Icon component={FoodIcons} />,
        label: <NavLink to="/users">Users</NavLink>,
    },
    {
        key: '/products',
        icon: <Icon component={FoodIcons} />,
        label: <NavLink to="/products">Products</NavLink>,
    },
    {
        key: '/orders',
        icon: <Icon component={BasketIcon} />,
        label: <NavLink to="/orders">Orders</NavLink>,
    },
    {
        key: '/promos',
        icon: <Icon component={GiftIcon} />,
        label: <NavLink to="/promos">Promos</NavLink>,
    },
]

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
    const { logout: logoutUserFromStore } = useAuthStore()
    const {
    token: { colorBgContainer},
  } = theme.useToken();

  const { mutate: logoutMutate } = useMutation({
  mutationKey: ["logout"],
  mutationFn: logout,
  onSuccess: async () => {
  logoutUserFromStore();
  return;
  }
  })
  
  const { user } = useAuthStore()
  
  if (user === null) {
      return <Navigate to="/auth/login" replace={ true } />
  }
  
    return (
        <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
          theme='light'
          collapsible
          collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" >
          <Logo/>           
        </div>
        <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: "16px",paddingRight: "16px", background: colorBgContainer }} >
        <Flex gap="middle" align="start" justify='space-between'>
          <Badge status='success' text={user?.role === "admin" ? "You are an admin" : user?.tenant?.address} />
          <Space size={16}>
            <Badge dot={true}>
            <BellFilled />
            </Badge>    
            <Dropdown menu={{
            items: [
              {
                key: "logout",
                label: "logout",
                onClick: () => logoutMutate()
              } 
            ]
            }}
            placement="bottomRight">
           <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
          </Dropdown>    

          </Space>   
        </Flex>
        </Header>
        <Content style={{ margin: '24px' }}>
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          MeraSpace 
        </Footer>
      </Layout>
    </Layout>
           
     </div>
   
  )
}

export default Dashboard