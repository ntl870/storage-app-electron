import { LaptopOutlined } from '@ant-design/icons'
import { useGetAllFilesAndFoldersOfUserLazyQuery } from '@renderer/generated/schemas'
import useComputer from '@renderer/hooks/useComputer'
import useCurrentUser from '@renderer/hooks/useCurrentUser'
import { convertBytesToGiB, spotChangesStorageObject } from '@renderer/utils/tools'
import { Progress, Spin, Typography } from 'antd'
import { useEffect } from 'react'

export const SyncPage = () => {
  const { name, hostname, storagePath } = useComputer()
  const { storageUsed, maxStorage, ID: userID, loading } = useCurrentUser()
  const [getAllFilesAndFolders] = useGetAllFilesAndFoldersOfUserLazyQuery()

  const handleSync = async (isInitial: boolean) => {
    if (!userID) return
    try {
      const { data } = await getAllFilesAndFolders()
      if (isInitial) {
        window.electron.ipcRenderer.send('save-storage-data', {
          data: data?.getAllFilesAndFoldersOfUser,
          userID
        })
      } else {
        window.electron.ipcRenderer.send('get-storage-data', {
          userID
        })
        window.electron.ipcRenderer.on('get-storage-data-reply', (_, arg) => {
          const changes = spotChangesStorageObject(arg, data?.getAllFilesAndFoldersOfUser)
          console.log(changes)

          if (changes.modifiedFiles) {
            window.electron.ipcRenderer.send('update-local-file', {
              userID,
              files: changes.modifiedFiles,
              storagePath
            })
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!userID) return
    window.electron.ipcRenderer.send('is-had-storage-data', {
      userID
    })
    window.electron.ipcRenderer.on('is-had-storage-data-reply', async (_, arg) => {
      if (!!arg) await handleSync(false)
    })
  }, [userID])

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex flex-row items-center">
        <LaptopOutlined className="text-xl mr-3" />
        <Typography.Title
          level={3}
          className="text-slate-500 mb-1"
        >{`${name} (${hostname})`}</Typography.Title>
      </div>
      <div className="flex flex-col">
        <Progress
          percent={(convertBytesToGiB(storageUsed ?? 0) * 100) / (maxStorage ?? 0)}
          size="default"
          showInfo={false}
        />
        <Typography.Text className="font-bold">{`${convertBytesToGiB(storageUsed ?? 0).toFixed(
          2
        )} GB used of ${maxStorage} GB`}</Typography.Text>
      </div>
    </div>
  )
}
