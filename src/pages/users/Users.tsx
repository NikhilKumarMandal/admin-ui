import { Alert, Breadcrumb, Button, Drawer, Form, Layout, Space, Spin, Table, theme } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allUsers, createUser } from "../../http/api";
import { FieldData, User, UserData } from "../../types";
import UsersFilter from "./UsersFilter";
import { useMemo, useState } from "react";
import UserFrom from "./from/UserFrom";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";

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
        title: 'RESTAURANTS',
        dataIndex: 'tenant',
        key: 'tenant',
        render: (_text: string, record: User) => {
            return (
                <div>
                    {record.tenant?.name}
                </div>
            );
        }
    },
    {
        title: 'CREATED AT',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function Users() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const queryClient = useQueryClient();

    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1
    });

    const [form] = Form.useForm();
    const [filterForm] = Form.useForm()

        const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
        }, 500);
    }, []);

    const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields.map((item) => (
        {
            [item.name[0]]: item.value
        }
    )).reduce((acc, item) => ({ ...acc, ...item }), {});

    if ('q' in changedFilterFields) {
            debouncedQUpdate(changedFilterFields.q);
        } else {
            setQueryParams((prev) => ({ ...prev, ...changedFilterFields, currentPage: 1 }));
        }
    };


    const {
        data: users,
        isFetching,
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
        placeholderData: keepPreviousData,
    });

    const { mutate: userMutation } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (data: UserData) => createUser(data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
            setDrawerOpen(false);  
        },
    });

    const handleSubmit = async () => {
        await form.validateFields();
        await userMutation(form.getFieldsValue());  
        form.resetFields();
        setDrawerOpen(false);
    };





    const {
        token: { colorBgLayout },
    } = theme.useToken();


return (
    <>
        {isFetching ? (
            <Layout
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spin tip="Loading..." size="large" />
            </Layout>
        ) : (
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

                {/* Conditionally render the error alert */}
                {isError && (
                    <Alert
                        message="Error"
                        description={error?.message || "Something went wrong!"}
                        type="error"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                    )}
                    

                    <Form form={filterForm} onFieldsChange={onFilterChange}>
                <UsersFilter>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}
                    >
                        Add User
                    </Button>
                </UsersFilter>
                    </Form>


                <Table
                    columns={columns}
                    dataSource={users?.data}
                    rowKey={"id"}
                    pagination={{
                        total: users?.total,
                        pageSize: PER_PAGE,
                        current: queryParams.currentPage,
                        onChange: (page) => {
                            console.log(page);
                            setQueryParams((prev) => {
                                return {
                                    ...prev,
                                    currentPage: page,
                                };
                            });
                        },
                    }}
                />
                <Drawer
                    title="Create User"
                    width={720}
                    destroyOnClose={true}
                    styles={{ body: { backgroundColor: colorBgLayout } }}
                    open={drawerOpen}
                    onClose={() => {
                        form.resetFields();
                        setDrawerOpen(false);
                    }}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setDrawerOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" form={form}>
                        <UserFrom />
                    </Form>
                </Drawer>
            </Space>
        )}
    </>
);

}

export default Users;


