import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/loginPage";
import Dashboard from "./Layout/Dashboard";
import NoAuth from "./Layout/NoAuth";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <HomePage/>
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

])