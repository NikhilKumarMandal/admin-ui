import { Card, Col, Form, Input, Row } from "antd";

function TenantForm() {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic info" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                  {
                    min: 8,
                    message: "Name must be at least 8 characters",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Address is required",
                  },
                  {
                    min: 12,
                    message: "Address must be at least 12 characters",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default TenantForm;
