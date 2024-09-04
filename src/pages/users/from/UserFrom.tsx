import { Card, Col, Form, Input, Row } from "antd"


function UserFrom() {
  return (
      <Row>
          <Col span={24}>
              <Card title= "Basic info" bordered={false}>
                  <Row gutter={20}>
                      <Col span={12}>
                          <Form.Item label="First Name" name="firstname">
                              <Input/>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                          <Form.Item label="Last Name" name="lastname">
                              <Input/>
                        </Form.Item>
                      </Col>
                  </Row>
              </Card> 
          </Col>
      </Row>
  )
}

export default UserFrom