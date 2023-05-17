import { computerProps } from '@renderer/App'
import { currentStep } from '@renderer/components/ProtectedLayout'
import {
  useConnectComputerMutation,
  useGetComputerByMacAddressLazyQuery
} from '@renderer/generated/schemas'
import useRouter from '@renderer/hooks/useRouter'
import { Button, Input, Result, Spin, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'

const SetupMachinePage = () => {
  const [connectComputer, { loading }] = useConnectComputerMutation()
  const [getComputerByMacAddress, { loading: getComputerByMacAddressLoading }] =
    useGetComputerByMacAddressLazyQuery()
  const { navigate } = useRouter()
  const [isConnectedBefore, setIsConnectedBefore] = useState(false)
  const [currentState, setCurrentState] = useState<{
    folderLocation?: string
    computerName?: string
    hostname?: string
    macAddress?: string
  } | null>(null)

  function invokeMainProcessFunction() {
    window.electron.ipcRenderer.send('open-folder')
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('folder-selected', (_, arg) => {
      setCurrentState((prevState) => ({
        ...prevState,
        folderLocation: arg
      }))
    })

    window.electron.ipcRenderer.send('get-computers-props')

    window.electron.ipcRenderer.on('computers-props', async (_, args) => {
      try {
        const { data } = await getComputerByMacAddress({
          variables: {
            macAddress: args.macAddress
          }
        })

        if (data?.getComputerByMacAddress) {
          setIsConnectedBefore(true)

          computerProps({
            name: data.getComputerByMacAddress.name,
            hostname: data.getComputerByMacAddress.hostname,
            macAddress: data.getComputerByMacAddress.macAddress
          })
          // wait for 3 seconds then navigate to the finishing up page

          setTimeout(() => {
            navigate(`/finishing-up?path=${data.getComputerByMacAddress.storagePath}`)
            currentStep(2)
          }, 3000)

          return
        }
        setCurrentState((prev) => ({
          ...prev,
          ...args
        }))
      } catch (err) {
        console.log(err)
      }
    })
  }, [])

  const onSubmit = async () => {
    try {
      await connectComputer({
        variables: {
          input: {
            name: currentState?.computerName || '',
            storagePath: currentState?.folderLocation || '',
            hostname: currentState?.hostname || '',
            macAddress: currentState?.macAddress || ''
          }
        }
      })
      currentStep(2)
      navigate(`/finishing-up?path=${currentState?.folderLocation}`)
    } catch (err) {
      notification.error({
        message: (err as Error).message
      })
    }
  }

  if (getComputerByMacAddressLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" tip="Checking system information..." />
      </div>
    )
  }

  if (isConnectedBefore) {
    return (
      <div className="flex justify-center items-center h-full">
        <Result status="success" title="This device is already connected to your account" />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-14">
        <div>
          <div className="flex flex-row items-center">
            <img src="/src/assets/logo.png" width={50} className="mr-2" />
            <Typography.Title level={2} className="mb-0">
              Setup your device
            </Typography.Title>
          </div>
          <div>
            <Input
              placeholder="Device name"
              className="mt-6"
              value={currentState?.computerName}
              onChange={(e) =>
                setCurrentState((prev) => ({
                  ...prev,
                  computerName: e.target.value
                }))
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-6">
            <Typography.Title level={5} className="mb-0">
              Folder location:
            </Typography.Title>
            <Typography.Text className="text-blue-400 truncate">
              {currentState?.folderLocation || 'Folder...'}
            </Typography.Text>
            <Button type="link" onClick={invokeMainProcessFunction}>
              Select folder
            </Button>
          </div>
        </div>
      </div>
      <div className="text-right mr-4 mb-4">
        <Button onClick={onSubmit} type="primary" loading={loading}>
          Start
        </Button>
      </div>
    </div>
  )
}

export default SetupMachinePage
