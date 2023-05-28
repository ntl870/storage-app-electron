import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import {
  useGetAllFilesAndFoldersOfUserLazyQuery,
  useUpdateComputerStoragePathMutation
} from '@renderer/generated/schemas'
import useCurrentUser from '@renderer/hooks/useCurrentUser'
import { useLocalStorage } from '@renderer/utils/tools'
import { Button, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'

function invokeMainProcessFunction() {
  window.electron.ipcRenderer.send('open-folder')
}

export const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { getLocalStorage, setLocalStorage } = useLocalStorage()
  const { ID: userID, rootFolderID } = useCurrentUser()
  const [getAllFilesAndFolders, { loading }] = useGetAllFilesAndFoldersOfUserLazyQuery()
  const [updateComputerStoragePath] = useUpdateComputerStoragePathMutation()

  const [currentState, setCurrentState] = useState<{
    folderLocation?: string
    macAddress?: string
  } | null>({
    folderLocation: getLocalStorage('storagePath'),
    macAddress: getLocalStorage('macAddress')
  })

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('folder-selected', (_, arg) => {
      setCurrentState((prevState) => ({
        ...prevState,
        folderLocation: arg
      }))
    })
  }, [])

  const handleSync = async () => {
    try {
      const { data } = await getAllFilesAndFolders({
        fetchPolicy: 'network-only'
      })
      window.electron.ipcRenderer.send('save-storage-data', {
        data: data?.getAllFilesAndFoldersOfUser,
        userID
      })
      await updateComputerStoragePath({
        variables: {
          storagePath: currentState?.folderLocation || '',
          macAddress: currentState?.macAddress || ''
        }
      })

      setLocalStorage('storagePath', currentState?.folderLocation)

      if (rootFolderID) {
        setIsLoading(true)

        window.electron.ipcRenderer.send('download-folder', {
          url: `${import.meta.env.RENDERER_VITE_BASE_API}/folders/${rootFolderID}`,
          extractFolder: currentState?.folderLocation,
          token: getLocalStorage('token')
        })

        window.electron.ipcRenderer.once('download-folder-complete', () => {
          setIsLoading(false)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" tip="Syncing data..." />
      </div>
    )
  }

  return (
    <div className="p-4 flex justify-between flex-col h-full">
      <div>
        <div className="flex flex-row items-center">
          <SettingOutlined className="text-xl mr-3" />
          <Typography.Title level={3} className="text-slate-500 mb-1">
            Settings
          </Typography.Title>
        </div>
        <div className="flex flex-row items-center justify-between mt-6">
          <Typography.Title level={5} className="mb-0">
            Folder location:
          </Typography.Title>
          <Typography.Text className="text-blue-400 truncate">
            {currentState?.folderLocation}
          </Typography.Text>
          <Button type="link" onClick={invokeMainProcessFunction}>
            Select folder
          </Button>
        </div>
      </div>

      <div className="text-right mr-4 mb-4 flex justify-between flex-row">
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
        <Button onClick={handleSync} type="primary" loading={loading}>
          Save
        </Button>
      </div>
    </div>
  )
}
