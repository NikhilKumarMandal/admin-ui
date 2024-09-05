import { Breadcrumb, Button, Drawer, Form, Layout, Space, Spin, Table, theme } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allUsers, createUser } from "../../http/api";
import { User, UserData } from "../../types";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import UserFrom from "./from/UserFrom";
import { PER_PAGE } from "../../constants";

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
        render: (_text: string, record: User) => {
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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const queryClient = useQueryClient()

    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1
    })

    const [form] = Form.useForm();  

    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );

            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string, string>
            ).toString();
            return allUsers(queryString).then((res) => res.data);
        },
        
    });

    const { mutate: userMutation } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (data: UserData) => createUser(data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
            setDrawerOpen(false);  
        }
    });

    const handleSubmit = async () => {

        await form.validateFields();
        await userMutation(form.getFieldsValue());  
        form.resetFields()
        setDrawerOpen(false)
    };

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

    const {
        token: { colorBgLayout },
    } = theme.useToken();

    // const users = data?.data;


    return (
        <>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
                <UsersFilter onFilterChange={(filterName: string, filterValue: string) => {
                    console.log(filterName, filterValue);
                }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}>
                        Add User
                    </Button>
                </UsersFilter>
                <Table columns={columns} dataSource={users?.data} rowKey={"id"}
                    pagination={{
                        total: users?.total,
                        pageSize: PER_PAGE,
                        current: queryParams.currentPage,
                        onChange: (page) => {
                            console.log(page);
                            setQueryParams((prev) => {
                                return {
                                ...prev,
                                currentPage: page
                            }
                            })
                        }
                }}
                />
                <Drawer
                    title="Create User"
                    width={720}
                    destroyOnClose={true}
                    styles={{ body: { backgroundColor: colorBgLayout } }}
                    open={drawerOpen}
                    onClose={() => {
                    form.resetFields()
                    setDrawerOpen(false)}
                    }
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setDrawerOpen(false);
                                }}>
                                Cancel
                            </Button>
                            <Button type="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Space>
                    }>
                    <Form layout="vertical" form={form}>
                        <UserFrom />
                    </Form>
                </Drawer>
            </Space>
        </>
    );
}

export default Users;


