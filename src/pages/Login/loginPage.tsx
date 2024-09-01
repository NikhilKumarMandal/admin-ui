import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex } from 'antd';
import { LockFilled,UserOutlined,LockOutlined } from "@ant-design/icons"
import Logo from '../../components/icons/Logo';


function LoginPage() {
  return (
    <>
      <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Space direction="vertical" align='center' size='large'>
        <Layout.Content style={{ display: 'flex',justifyContent: "center",alignItems: "center" }} >
        <Logo/>
        </Layout.Content>
        <Card
          style={{ width: 300 }}
          bordered={false}
          title={
          <Space style={{width:"100%",fontSize:16, justifyContent:"center"}}>
          <LockFilled />
          Sign in
          </Space>
        }
        >
          <Form initialValues={{remember: true}}>
            
              <Form.Item name="username" rules={[
              {
                required: true,
                message: "Please input your Username"
              },
              {
                type: "email",
                message: "Email is not Valid"
              }
            ]}>
              <Input prefix={<UserOutlined />} placeholder='username'/>
            </Form.Item>

              <Form.Item name="password" rules={[
              {
                required: true,
                message: "Please input your Username"
              },
              
            ]}>
              <Input.Password prefix={<LockOutlined />} placeholder='password' />
              </Form.Item>
              

            <Flex justify='space-between' >
            <Form.Item name="remember" valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href='#' id='forget-password'>Forget Password</a>
            </Flex>
            


            <Form.Item >
              <Button type='primary' htmlType='submit' style={{width: "100%"}}>
                Log in
              </Button>
            </Form.Item>
            
        </Form>
        </Card>
        </Space>
        
      </Layout>
    </>
    
  )
}

export default LoginPage;