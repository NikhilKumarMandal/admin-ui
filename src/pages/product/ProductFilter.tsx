import { useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from 'antd';
import {  getCategories, getTenants } from '../../http/api';
import { Category, Tenant } from '../../types';

type ProductFilterProps = {
    children?: React.ReactNode;
    
};

const ProductFilter = ({ children }: ProductFilterProps) => {
    
    const { data: restaurants, } = useQuery({
        queryKey: ["restaurants"],
        queryFn: () => {
            return  getTenants(`perPage=100&currentPage=1`)
        }
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories();
        },
    });

    console.log("categories",categories);
    
  return (
            <Card>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={6}>
                            <Form.Item name="q">
                                <Input.Search allowClear={true} placeholder="Search" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="role">
                                <Select
                                    style={{ width: '100%' }}
                                    allowClear={true}
                                    placeholder="Select role"
                                   
                              >
                                  {
                                      categories?.data.map((category: Category) => {
                                          return (
                                              <Select.Option
                                              key={category._id}
                                              value={category._id}>{category?.name}</Select.Option>
                                          )
                                          
                                    } )  
                                  }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="restaurants"
                                allowClear={true}
                                onChange={() => {}}
                          >
                             { restaurants?.data.data.map((restaurant: Tenant) => {
                                            return (
                                                <Select.Option
                                                    key={restaurant.id}
                                                    value={restaurant.id}>
                                                    {restaurant.name}
                                                </Select.Option>
                                            );
                                 })
                              }
                            </Select>
                      </Col>
                       <Col span={6}>
                            <Space>
                                <Form.Item name="isPublish">
                                    <Switch defaultChecked={false} onChange={() => {}} />
                                </Form.Item>
                                <Typography.Text style={{ marginBottom: 22, display: 'block' }}>
                                    Show only published
                                </Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
                    {children}
                </Col>
            </Row>
        </Card>
  )
}

export default ProductFilter