import { useQuery } from "@tanstack/react-query"
import { self } from "../http/api";
import { useAuthStore } from "../store/store";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Layout, Spin } from "antd";
import { AxiosError } from "axios";



const getSelf = async () => {
  const { data } = await self();
  return data;
}

function Root() {

    const { setUser } = useAuthStore()
    const {data,isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: (failureCount: number, error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
            return false;
          }
          return failureCount < 3;
        },
    })

    useEffect(() => {
        if (data) {
        setUser(data)
        }
        
    },[data,setUser])
    
    if (isLoading) {
        return (
        <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin  tip="Loading..." size="large" />
        </Layout>
        )
    }
  return <Outlet/>  
}

export default Root