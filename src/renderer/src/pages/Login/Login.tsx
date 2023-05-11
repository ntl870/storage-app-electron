import { currentStep } from '@renderer/components/ProtectedLayout'
import { Button, Checkbox, Form, Input } from 'antd'
import { MutationLoginArgs, useLoginMutation } from '../../generated/schemas'
import { useAlert } from '../../hooks/useAlert'
import useRouter from '../../hooks/useRouter'
import { useLocalStorage } from '../../utils/tools'

const Login = () => {
  const [login, { loading }] = useLoginMutation()
  const { setLocalStorage } = useLocalStorage()
  const { showErrorNotification } = useAlert()
  const { navigate } = useRouter()

  const onFinish = async ({ email, password }: MutationLoginArgs) => {
    try {
      const { data } = await login({
        variables: {
          email,
          password
        }
      })
      setLocalStorage('token', data?.login || '')
      currentStep(1)
      navigate('/setup-machine')
    } catch (err) {
      showErrorNotification((err as Error).message)
    }
  }

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-80 max-w-md"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
        >
          <Input placeholder="Email" size="large" className="rounded-full" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" size="large" className="rounded-full" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="text-lg">Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full rounded-full"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
