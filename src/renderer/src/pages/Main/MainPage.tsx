import { CloudUploadOutlined } from '@ant-design/icons'
import useRouter from '@renderer/hooks/useRouter'
import { Button, Image, Typography } from 'antd'

const MainPage = () => {
  const { navigate } = useRouter()

  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <Image src="/src/assets/logo.png" width={200} className="mb-8" preview={false} />
      <Typography.Title level={2}>Backup and sync with CloudStorage</Typography.Title>
      <Button
        icon={<CloudUploadOutlined />}
        size="large"
        type="link"
        className="text-2xl"
        onClick={() => navigate('/login')}
      >
        Sync with CloudStorage
      </Button>
    </div>
  )
}

export default MainPage
