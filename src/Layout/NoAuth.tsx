import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/store"


function NoAuth() {
  const { user } = useAuthStore()
  if (user !== null) {
      const returnTo = new URLSearchParams(location.search).get('returnTo') || "/"
        return <Navigate to={returnTo} replace={ true } />
    }
  return (
    <Outlet/>
  )
}

export default NoAuth