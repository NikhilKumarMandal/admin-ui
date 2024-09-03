import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/store'
import {  Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import Logo from '../components/icons/Logo';
import Icon from '@ant-design/icons';
import Home from '../components/icons/Home';
import FoodIcons from "../components/icons/FoodIcons"
import BasketIcon from '../components/icons/BasketIcon';
import GiftIcon from '../components/icons/GiftIcon';

const items = [
    {
        key: "/",
        icon: <Icon component={Home} />,
        label: <NavLink to="/">Home</NavLink>
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
    const {
    token: { colorBgContainer},
    } = theme.useToken();
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
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