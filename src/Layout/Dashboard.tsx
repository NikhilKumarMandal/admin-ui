import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
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
import UserIcon from '../components/icons/UserIcon';


const menuItems = (role: string) => {
  const baseItems = [
    {
        key: "/",
        icon: <Icon component={Home} />,
        label: <NavLink to="/">Home</NavLink>
    },
    {
        key: '/products',
        icon: <Icon component={FoodIcons} />,
        label: <NavLink to="/product">Products</NavLink>,
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

  if (role === 'admin') {
        const menus = [...baseItems];
        menus.splice(1, 0, {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to="/users">Users</NavLink>,
        });
        menus.splice(2, 0, {
        key: '/restaurants',
        icon: <Icon component={FoodIcons} />,
        label: <NavLink to="/tenant">Restaurants</NavLink>,
    
        })
        return menus;
    }

  return baseItems
}



function Dashboard() {
  const location = useLocation()
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
      return <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace={ true } />
  }

  const items = menuItems(user?.role)
  
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
        <Menu theme="light" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
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