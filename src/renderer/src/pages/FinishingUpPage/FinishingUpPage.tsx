import { currentStep } from '@renderer/components/ProtectedLayout'
import useCurrentUser from '@renderer/hooks/useCurrentUser'
import useRouter from '@renderer/hooks/useRouter'
import { useLocalStorage } from '@renderer/utils/tools'
import { Result, Spin } from 'antd'
import { useEffect, useState } from 'react'

export const FinishingUpPage = () => {
  const { rootFolderID, ID: userID } = useCurrentUser()
  const { searchParamsObject, navigate } = useRouter()
  const { getLocalStorage, setLocalStorage } = useLocalStorage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setLocalStorage('storagePath', searchParamsObject.path)
    setLocalStorage('userID', userID)
    currentStep(2)
    if (rootFolderID) {
      setIsLoading(true)

      window.electron.ipcRenderer.send('download-folder', {
        url: `${import.meta.env.RENDERER_VITE_BASE_API}/folders/${rootFolderID}`,
        extractFolder: searchParamsObject.path,
        token: getLocalStorage('token')
      })

      window.electron.ipcRenderer.once('download-folder-complete', () => {
        setIsLoading(false)

        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
    }
  }, [rootFolderID])

  return (
    <div className="flex justify-center items-center h-full">
      {isLoading ? (
        <Spin size="large" tip="Syncing data..." />
      ) : (
        <Result status="success" title="Successfully Synced" />
      )}
    </div>
  )
}
