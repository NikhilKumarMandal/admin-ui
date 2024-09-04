import { Breadcrumb, Button, Drawer, Form, Layout, Space, Spin, Table } from "antd";
import { RightOutlined,PlusOutlined } from "@ant-design/icons";
import {  Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../http/api";
import { User } from "../../types";
import UsersFilter from "./UsersFilter";
import { useState } from "react";



const columns = [
    {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_text: string,record: User) =>  {
    return (
        <div>
        {record.firstName} {record.lastName}
        </div>
        );
        }
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'ROLE',
    dataIndex: 'role',
    key: 'role',
    }, 
  {
    title: 'CREATED AT',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

function Users() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            return await allUsers().then((res) => res.data); 
        }
    });

    if (isLoading) {
        return (
            <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin tip="Loading..." size="large" />
            </Layout>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // const { user } = useAuthStore()
    // if (user?.role !== 'admin') {
    //     return <Navigate to="/" replace={true} />;
    // }

    const users = data?.data;
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
            <Breadcrumb
                separator={<RightOutlined />}
                items={[
                    {
                        title: <Link to="/">Dashboard</Link>,
                    },
                    {
                        title: "Users",
                    },
                ]}
                />
                <UsersFilter onFilterChange={(filterName: string,filterValue: string) => {
                        console.log(filterName,filterValue);
                        
                }}>
                    <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setDrawerOpen(true)}>
                            Add User
                        </Button>
                </UsersFilter>
                <Table columns={columns} dataSource={users} rowKey={"id"} />
                <Drawer
                    title="Create User"
                    width={720}
                    destroyOnClose={true}
                    open={drawerOpen}
                    onClose={() => {
                        setDrawerOpen(false);
                    }}
                    extra={
                        <Space>
                            <Button
                               >
                                Cancel
                            </Button>
                            <Button type="primary" >
                                Submit
                            </Button>
                        </Space>
                    }>
                </Drawer>
                </Space>
        </>
    );
}

export default Users;

