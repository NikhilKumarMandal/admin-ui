import { useQuery } from "@tanstack/react-query"
import { self } from "../http/api";
import { useAuthStore } from "../store/store";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";



const getSelf = async () => {
  const { data } = await self();
  return data;
}

function Root() {

    const { setUser } = useAuthStore()
    const {data,isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    })

    useEffect(() => {
        if (data) {
        setUser(data)
        }
        
    },[data,setUser])
    
    if (isLoading) {
        return <div>Loding.....</div>
    }
  return <Outlet/>  
}

export default Root