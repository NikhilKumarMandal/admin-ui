import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/store"


function NoAuth() {
  const { user } = useAuthStore()
    if (user !== null) {
        return <Navigate to="/" replace={ true } />
    }
  return (
    <Outlet/>
  )
}

export default NoAuth