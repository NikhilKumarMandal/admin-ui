
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/store'

function Dashboard() {
    const { user } = useAuthStore()
    if (user === null) {
        return <Navigate to="/auth/login" replace={ true } />
    }
    return (
        <div>
            <Outlet/>
      </div>
   
  )
}

export default Dashboard