import { useQuery } from "@tanstack/react-query"
import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { allTenant } from "../../../http/api"
import { Tenant } from "../../../types"


function UserFrom() {

    const { data: tenants } = useQuery({
        queryKey: ["tenant"],
        queryFn: async () => {
            return await allTenant().then((res) => res.data)
        }
    })
  return (
      <Row>
          <Col span={24}>
              <Space direction="vertical" size="large">
                <Card title= "Basic info" bordered={false}>
                  <Row gutter={20}>
                      <Col span={12}>
                          <Form.Item label="First Name" name="firstname" rules={[
                                {
                                    required: true,
                                    message: "First Name is requried"
                              }
                          ]}>
                              <Input size="large"/>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                              <Form.Item label="Last Name" name="lastname" rules={[
                                {
                                      required: true,
                                    message: "Last Name is requried"
                              }
                          ]}>
                              <Input size="large"/>
                        </Form.Item>
                      </Col>
                        <Col span={12}>
                          <Form.Item label="Email" name="email" rules={[
                                {
                                      required: true,
                                    message: "Email is requried"
                              }
                          ]}>
                              <Input size="large" type="email"/>
                        </Form.Item>
                      </Col>
                  </Row>
                  </Card>  
                  
                <Card title= "Security info" bordered={false}>
                  <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item label="Password" name="password" rules={[
                                {
                                    required: true,
                                    message: "Password is requried"
                              }
                          ]}>
                              <Input size="large" type="password"/>
                        </Form.Item>
                      </Col>
                  </Row>
                  </Card>  
                <Card title= "Security info" bordered={false}>
                  <Row gutter={20}>
                        <Col span={12}>
                                <Form.Item
                                    label="Role"
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Role is required',
                                        },
                                    ]}>
                                    <Select
                                        id="selectBoxInUserForm"
                                        size="large"
                                        style={{ width: '100%' }}
                                        allowClear={true}
                                        onChange={() => {}}
                                        placeholder="Select role">
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="manager">Manager</Select.Option>
                                    </Select>
                                </Form.Item>
                          </Col>
                          
                          <Col span={12}>
                            <Form.Item
                                label="Restaurant"
                                name="tenantId"
                                rules={[
                                            {
                                                required: true,
                                                message: 'Restaurant is required',
                                            },
                                        ]}>
                                        <Select
                                            size="large"
                                            style={{ width: '100%' }}
                                            allowClear={true}
                                            onChange={() => {}}
                                            placeholder="Select restaurant">
                                            {tenants?.data.map((tenant: Tenant) => (
                                                <Select.Option value={tenant.id} key={tenant.id}>
                                                    {tenant.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                  </Row>
              </Card>  
              </Space>

          </Col>
      </Row>
  )
}

export default UserFrom