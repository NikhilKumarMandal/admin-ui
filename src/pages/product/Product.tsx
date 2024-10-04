import { Breadcrumb, Button, Form, Space } from "antd"
import { Link } from "react-router-dom"
import { RightOutlined,PlusOutlined} from "@ant-design/icons";
import { FieldData } from "../../types";
import ProductFilter from "./ProductFilter";

function Product() {


    const [filterForm] = Form.useForm()

    // const onFilterChange = (changedFields: FieldData[]) => {
    //     const changedFilterFields = changedFields.map((item) => (
    //         {
    //             [item.name[0]]: item.value
    //         }
    //     )).reduce((acc, item) => ({ ...acc, ...item }), {});
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
            </Space>
        )
    }


export default Product