import { Breadcrumb, Button, Form, Space, Table, Typography,Image, Tag } from "antd"
import { Link } from "react-router-dom"
import { RightOutlined,PlusOutlined} from "@ant-design/icons";
import ProductFilter from "./ProductFilter";
import { PER_PAGE } from "../../constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { allProducts } from "../../http/api";
import { format } from "date-fns";
import { useState } from "react";
import { Products } from "../../types";


const columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: (_text: string, record: Products) => {
            return (
                <div>
                    <Space>
                        <Image width={60} src={record.image.url} preview={false}  />
                        <Typography.Text>{record.name}</Typography.Text>
                    </Space>
                </div>
            );
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_: boolean, record: Products) => {
            return (
                <>
                    {record.isPublish ? (
                        <Tag color="green">Published</Tag>
                    ) : (
                        <Tag color="red">Draft</Tag>
                    )}
                </>
            );
        },
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => {
            return <Typography.Text>{format(new Date(text), 'dd/MM/yyyy HH:mm')}</Typography.Text>;
        },
    },
];

function Product() {

    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1
    });

    const [filterForm] = Form.useForm()

    const {
        data: products,
    } = useQuery({
        queryKey: ['products', queryParams],
        queryFn: () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );

            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string, string>
            ).toString();
            return allProducts(queryString).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });

    console.log("products",products)
    
        return (
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
          

                <Form form={filterForm} onFieldsChange={() => {}}>
                    <ProductFilter>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => { }}
                        >
                            Add Product
                        </Button>
                    </ProductFilter>
                </Form>

            <Table
                columns={[
                            ...columns,
                            {
                            title: 'Actions',
                            render: () => {
                                return (
                                    <Space>
                                        <Button
                                            type="link"
                                            onClick={() => {}}>
                                            Edit
                                        </Button>
                                    </Space>
                                );
                            },
                        },
                        ]}
                    dataSource={products?.data}
                    rowKey={"id"}
                    pagination={{
                        total: products?.total,
                        pageSize: PER_PAGE,
                        current: queryParams.currentPage,
                        onChange: (page) => {
                            console.log(page);
                            setQueryParams((prev:any) => {
                                return {
                                    ...prev,
                                    currentPage: page,
                                };
                            });
                        },
                        showTotal: (total: number, range: number[]) => {
                            console.log(total, range);
                            return `Showing ${range[0]}-${range[1]} of ${total} items`;
                        },
                    }}
                />
            </Space>
        )
    }


export default Product