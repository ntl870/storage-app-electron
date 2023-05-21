import { LaptopOutlined } from '@ant-design/icons'
import { useGetAllFilesAndFoldersOfUserLazyQuery } from '@renderer/generated/schemas'
import useComputer from '@renderer/hooks/useComputer'
import useCurrentUser from '@renderer/hooks/useCurrentUser'
import { convertBytesToGiB, spotChangesStorageObject, useLocalStorage } from '@renderer/utils/tools'
import { Button, Progress, Spin, Typography } from 'antd'
import { useEffect } from 'react'

export const SyncPage = () => {
  const { name, hostname, storagePath } = useComputer()
  const { storageUsed, maxStorage, ID: userID, loading } = useCurrentUser()
  const [getAllFilesAndFolders] = useGetAllFilesAndFoldersOfUserLazyQuery()
  const { getLocalStorage } = useLocalStorage()

  const handleSync = async (isInitial: boolean) => {
    if (!userID) return
    try {
      const { data } = await getAllFilesAndFolders({
        fetchPolicy: 'network-only'
      })
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

          if (changes.modifiedFiles.length) {
            window.electron.ipcRenderer.send('update-local-file', {
              userID,
              files: changes.modifiedFiles.filter((item: any) => item.source === 'newObj'),
              storagePath
            })
          }
          if (changes.newFiles.length) {
            window.electron.ipcRenderer.send('get-new-local-files', {
              files: changes.newFiles.filter((item: any) => item.source === 'newObj'),
              userID,
              storagePath
            })
          }

          if (changes.deletedFiles.length) {
            window.electron.ipcRenderer.send('delete-local-files', {
              files: changes.deletedFiles.filter((item: any) => item.source === 'newObj'),
              userID,
              storagePath
            })
          }

          if (changes.modifiedFolders.length) {
            window.electron.ipcRenderer.send('update-local-folders', {
              userID,
              folders: changes.modifiedFolders.filter((item: any) => item.source === 'newObj'),
              storagePath,
              token: getLocalStorage('token')
            })
          }

          if (changes.movedFiles.length) {
            window.electron.ipcRenderer.send('move-local-files', {
              userID,
              files: changes.movedFiles.filter((item: any) => item.source === 'newObj'),
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
      if (!arg) await handleSync(true)
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
      <div>
        <Button onClick={() => handleSync(false)}>Sync</Button>
      </div>
    </div>
  )
}
