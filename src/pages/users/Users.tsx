import { Breadcrumb, Layout, Space, Spin, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../http/api";
import { User } from "../../types";
import UsersFilter from "./UsersFilter";



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
                <UsersFilter/>
                <Table columns={columns} dataSource={users} />
                </Space>
            {/* <ul>
                {users.map((user:User) => (
                    <li key={user?.id}>
                        {user?.firstName} {user?.lastName} - {user?.email}
                    </li>
                ))}
            </ul> */}
        </>
    );
}

export default Users;

