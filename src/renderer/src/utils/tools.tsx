import {
  FilePdfOutlined,
  FileZipOutlined,
  FileTextOutlined,
  FileOutlined,
  AudioOutlined
} from '@ant-design/icons'
import { File as FileSchema } from '@renderer/generated/schemas'
import { Image } from 'antd'

export const useLocalStorage = () => {
  return {
    setLocalStorage: (key: string, value: any) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    getLocalStorage: (key: string) => {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
      return null
    },
    deleteLocalStorage: (key: string) => {
      localStorage.removeItem(key)
    }
  }
}

export const downloadURI = (fileID: string, type: 'files' | 'folders') => {
  const link = document.createElement('a')
  link.href = `${import.meta.env.VITE_BASE_API}/${type}/${fileID}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const groupFilesByFolder = (files: File[]) => {
  const folders = []

  for (const file of files) {
    const path = file.webkitRelativePath.split('/')
    const folderName = path[0]

    // Check if folder already exists in folders array
    let folder: any = folders.find((f) => f.name === folderName)

    // If folder doesn't exist, create it and add to folders array
    if (!folder) {
      folder = {
        name: folderName,
        files: [],
        folders: []
      }
      folders.push(folder)
    }

    // Traverse subfolders and create them if they don't exist
    let currentFolder = folder
    for (let i = 1; i < path.length - 1; i++) {
      const subfolderName = path[i]
      let subfolder = currentFolder.folders.find((f: File) => f.name === subfolderName)
      if (!subfolder) {
        subfolder = {
          name: subfolderName,
          files: [],
          folders: []
        }
        currentFolder.folders.push(subfolder)
      }
      currentFolder = subfolder
    }

    // Add file to current folder
    currentFolder.files.push(file)
  }

  return folders
}

export const getFileURL = (fileID?: string) => `${import.meta.env.VITE_BASE_API}/files/${fileID}`

export const renderIconByFileType = (file: FileSchema) => {
  switch (file.fileType) {
    case 'pdf':
      return <FilePdfOutlined className="text-7xl mt-6" />
    case 'png':
    case 'jpg':
      return (
        <Image src={getFileURL(file.ID)} preview={false} height={104} className="object-cover" />
      )
    case 'mp4':
    case 'mp3':
      return <AudioOutlined className="text-7xl mt-6" />
    case 'zip':
      return <FileZipOutlined className="text-7xl mt-6" />
    case 'txt':
      return <FileTextOutlined className="text-7xl mt-6" />
    default:
      return <FileOutlined className="text-7xl mt-6" />
  }
}

export const convertBytesToGiB = (bytes: number) => {
  return bytes / (1024 * 1024 * 1024)
}

export const spotChangesStorageObject = (oldObj, newObj) => {
  const changes = {
    modifiedFolders: [],
    modifiedFiles: [],
    deletedFolders: [],
    deletedFiles: [],
    newFolders: [],
    newFiles: [],
    movedFolders: [],
    movedFiles: []
  }

  // Compare folders
  for (const newFolder of newObj.folders) {
    const oldFolder = oldObj.folders.find((folder) => folder.ID === newFolder.ID)

    if (!oldFolder) {
      const newFolderWithSource = { ...newFolder, source: 'newObj' }
      changes.newFolders.push(newFolderWithSource)
    } else if (oldFolder.modifiedDate !== newFolder.modifiedDate) {
      const latestModifiedDate =
        new Date(newFolder.modifiedDate) > new Date(oldFolder.modifiedDate)
          ? newFolder.modifiedDate
          : oldFolder.modifiedDate

      const updatedFolder = { ...newFolder, modifiedDate: latestModifiedDate }
      const updatedFolderWithSource = { ...updatedFolder, source: 'newObj' }
      changes.modifiedFolders.push(updatedFolderWithSource)
    }

    // Check for moved folders
    if (oldFolder && oldFolder.path !== newFolder.path) {
      const movedFolderWithSource = { ...newFolder, source: 'newObj' }
      changes.movedFolders.push(movedFolderWithSource)

      // Exclude moved folders from modifiedFolders
      const index = changes.modifiedFolders.findIndex((folder) => folder.ID === newFolder.ID)
      if (index !== -1) {
        changes.modifiedFolders.splice(index, 1)
      }
    }
  }

  // Compare files
  for (const newFile of newObj.files) {
    const oldFile = oldObj.files.find((file) => file.ID === newFile.ID)

    if (!oldFile) {
      const newFileWithSource = { ...newFile, source: 'newObj' }
      changes.newFiles.push(newFileWithSource)
    } else if (oldFile.modifiedDate !== newFile.modifiedDate) {
      // Check if the file is not moved
      if (oldFile.url === newFile.url) {
        const latestModifiedDate =
          new Date(newFile.modifiedDate) > new Date(oldFile.modifiedDate)
            ? newFile.modifiedDate
            : oldFile.modifiedDate

        const updatedFile = { ...newFile, modifiedDate: latestModifiedDate }
        const updatedFileWithSource = { ...updatedFile, source: 'newObj' }
        changes.modifiedFiles.push(updatedFileWithSource)
      }
    }

    // Check for moved files
    if (oldFile && oldFile.url !== newFile.url) {
      const movedFileWithSource = { ...newFile, source: 'newObj' }
      changes.movedFiles.push(movedFileWithSource)
    }
  }

  // Find deleted folders
  for (const oldFolder of oldObj.folders) {
    const folderExists = newObj.folders.some((folder) => folder.ID === oldFolder.ID)
    if (!folderExists) {
      const deletedFolderWithSource = { ...oldFolder, source: 'oldObj' }
      changes.deletedFolders.push(deletedFolderWithSource)
    }
  }

  // Find deleted files
  for (const oldFile of oldObj.files) {
    const fileExists = newObj.files.some((file) => file.ID === oldFile.ID)
    if (!fileExists) {
      const deletedFileWithSource = { ...oldFile, source: 'oldObj' }
      changes.deletedFiles.push(deletedFileWithSource)
    }
  }

  return changes
}
