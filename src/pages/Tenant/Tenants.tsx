import { Breadcrumb, Button, Drawer, Form, Layout, Space, Spin, Table, theme } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allTenant, createTenant } from "../../http/api";
import { useState } from "react";
import TenantFilter from "./TenantFilter";
import TenantFrom from "./from/TenantFrom";
import { Tenant } from "../../types";


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'CREATED AT',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];



function Tenants() {
const [drawerOpen, setDrawerOpen] = useState(false);
    const queryClient = useQueryClient()

    const [form] = Form.useForm();  

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            return await allTenant().then((res) => res.data);
        }
    });

    const { mutate: tenantMutation } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (data: Tenant) => createTenant(data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
            setDrawerOpen(false);  
        }
    });

    const handleSubmit = async () => {

        await form.validateFields();
        await tenantMutation(form.getFieldsValue());  
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

    const users = data?.data;


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
                            title: "Tenant",
                        },
                    ]}
                />
                <TenantFilter onFilterChange={(filterName: string, filterValue: string) => {
                    console.log(filterName, filterValue);
                }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}>
                        Add Tenant
                    </Button>
                </TenantFilter>
                <Table columns={columns} dataSource={users} rowKey={"id"} />
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
                       <TenantFrom/>
                    </Form>
                </Drawer>
            </Space>
        </>
    );
}

export default Tenants