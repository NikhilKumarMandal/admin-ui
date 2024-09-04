import { Card, Col, Form, Input, Row } from 'antd';

type UsersFilterProps = {
    children?: React.ReactNode;
    onFilterChange: (filterName: string, filterValue: string) => void;
};

const TenantFilter =  ({ onFilterChange,children }: UsersFilterProps) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={8}>
                            <Form.Item name="q">
                                <Input.Search size='large' allowClear={true} placeholder="Search" onChange={(e) => onFilterChange("searchUser",e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
                    {children}
                </Col>
            </Row>
        </Card>
    );
}

export default TenantFilter