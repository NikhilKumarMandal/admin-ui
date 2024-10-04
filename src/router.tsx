import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/loginPage";
import Dashboard from "./Layout/Dashboard";
import NoAuth from "./Layout/NoAuth";
import Root from "./Layout/Root";
import Users from "./pages/users/Users";
import Tenant from "./pages/Tenant/Tenants";
import Product from "./pages/product/Product";



export const router = createBrowserRouter([


    {
        path: "/",
        element: <Root />,
        children: [
    {
        path: "",
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/tenant',
                element: <Tenant/>
            },
            {
                path: '/product',
                element: <Product/>
            }
        ]
    },
    {
        path: "/auth",
        element: <NoAuth />,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            }
        ]
    }
        ]
    },
    

])