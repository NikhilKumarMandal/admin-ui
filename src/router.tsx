import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/loginPage";
import Dashboard from "./Layout/Dashboard";
import NoAuth from "./Layout/NoAuth";
import Root from "./Layout/Root";
import Users from "./pages/users/users";



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