import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import AdmZip from 'adm-zip'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import getMAC from 'getmac'
import * as os from 'os'
import path, { join } from 'path'
import isZip from 'is-zip'
import request from 'request'
import icon from '../../resources/icon.png?asset'
import StartWatcher from './processes'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  unlinkSync,
  writeFileSync
} from 'fs'
import dotenv from 'dotenv'
import axios from 'axios'
import { removeFilePathPattern } from './tools'
dotenv.config()

function handleFolderSelection(mainWindow: BrowserWindow) {
  dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      mainWindow.webContents.send('folder-selected', result.filePaths[0])
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleDownloadFolder = async (
  event: Electron.IpcMainEvent,
  token: string,
  url: string,
  extractFolder: string
) => {
  try {
    // Download the ZIP file to a temporary location
    request(
      {
        url: url,
        encoding: null,
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      (error, response, body) => {
        if (error) {
          console.error('Error downloading the ZIP file:', error)
          return
        }
        if (response.statusCode !== 200) {
          console.error('Failed to download the ZIP file. Status code:', response.statusMessage)
          return
        }

        // Save the downloaded ZIP file
        // writeFileSync(extractFolder, body)

        // Extract the ZIP file
        const zip = new AdmZip(body)
        zip.extractAllTo(extractFolder, true)
        event.sender.send('download-folder-complete')
        console.log('ZIP file extracted successfully to:', extractFolder)
      }
    )
  } catch (error) {
    console.log(error)
    // Notify the renderer process of any errors
    // event.sender.send('extractionError', error)
  }
}

const getComputersProps = () => {
  const hostname = os.hostname()

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    macAddress: getMAC.default(),
    hostname
  }
}

const handleWriteStorageDataToJSON = (data, userID: string) => {
  const userDataPath = app.getPath('userData')
  const dataDir = path.join(userDataPath, 'storageData')
  mkdirSync(dataDir, { recursive: true })

  const jsonData = JSON.stringify(data, null, 2)
  const filePath = path.join(dataDir, `storageData-${userID}.json`)
  writeFileSync(filePath, jsonData)
}

export const getNewLocalChangesJSONData = (userID: string) => {
  try {
    const userDataPath = app.getPath('userData')
    const dataDir = path.join(userDataPath, 'storageData')
    const filePath = path.join(dataDir, `newLocalChanges-${userID}.json`)
    const data = readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return {
      files: [],
      folders: []
    }
  }
}

export const handleWriteToNewLocalChanges = (data, userID: string) => {
  const userDataPath = app.getPath('userData')
  const dataDir = path.join(userDataPath, 'storageData')
  mkdirSync(dataDir, { recursive: true })

  const jsonData = JSON.stringify(data, null, 2)
  const filePath = path.join(dataDir, `newLocalChanges-${userID}.json`)
  writeFileSync(filePath, jsonData)
}

const clearNewLocalChanges = (userID: string) => {
  const userDataPath = app.getPath('userData')
  const dataDir = path.join(userDataPath, 'storageData')
  const filePath = path.join(dataDir, `newLocalChanges-${userID}.json`)
  unlinkSync(filePath)
}

const isHadStorageData = (userID: string) => {
  const userDataPath = app.getPath('userData')
  const dataDir = path.join(userDataPath, 'storageData')
  const filePath = path.join(dataDir, `storageData-${userID}.json`)
  return existsSync(filePath)
}

const getStorageJSONData = (userID: string) => {
  const userDataPath = app.getPath('userData')
  const dataDir = path.join(userDataPath, 'storageData')
  const filePath = path.join(dataDir, `storageData-${userID}.json`)
  const data = readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  const mainWindow = BrowserWindow.getAllWindows()[0]

  const userID =
    String(
      await mainWindow.webContents.executeJavaScript('JSON.parse(localStorage.getItem("userID"))')
    ) || ''

  const dirPath =
    String(
      await mainWindow.webContents.executeJavaScript(
        'JSON.parse(localStorage.getItem("storagePath"))'
      )
    ) || ''
  StartWatcher(dirPath, mainWindow, userID)

  ipcMain.on('open-folder', () => {
    handleFolderSelection(mainWindow)
  })

  ipcMain.on('get-computers-props', (event) => {
    event.reply('computers-props', getComputersProps())
  })

  ipcMain.on('download-folder', (event, args) => {
    if (!args.url || !args.extractFolder) return
    handleDownloadFolder(event, args.token, args.url, args.extractFolder)
  })

  ipcMain.on('save-storage-data', (_, args) => {
    handleWriteStorageDataToJSON(args.data, args.userID)
  })

  ipcMain.on('is-had-storage-data', (event, args) => {
    event.reply('is-had-storage-data-reply', isHadStorageData(args.userID))
  })

  ipcMain.on('get-storage-data', (event, args) => {
    const userDataPath = app.getPath('userData')
    const dataDir = path.join(userDataPath, 'storageData')
    const filePath = path.join(dataDir, `storageData-${args.userID}.json`)
    const data = readFileSync(filePath, 'utf8')
    const storageData = JSON.parse(data)
    event.reply('get-storage-data-reply', storageData)
  })

  ipcMain.on('update-local-file', async (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.files.forEach(async (file) => {
      if (file.source === 'newObj') {
        const updateIndex = storageData.files.findIndex((item) => item.ID === file.ID)
        storageData.files[updateIndex] = file
        handleWriteStorageDataToJSON(storageData, args.userID)
        try {
          const { data } = await axios.get(`${process.env.MAIN_VITE_BASE_API}/files/${file.ID}`)
          // write this file
          const localPath = path.join(args.storagePath, removeFilePathPattern(file.url))
          const oldFilePath = path.join(
            args.storagePath,
            removeFilePathPattern(storageData.files[updateIndex].url)
          )
          unlinkSync(oldFilePath)
          writeFileSync(localPath, data)
        } catch (err) {
          // console.log(err)
        }
      }
    })
    event.reply('update-local-file-reply')
  })

  ipcMain.on('get-new-local-files', async (event, args) => {
    const storageData = getStorageJSONData(args.userID)

    args.files.forEach(async (file) => {
      const { data } = await axios.get(`${process.env.MAIN_VITE_BASE_API}/files/${file.ID}`)
      // write this file
      const localPath = path.join(args.storagePath, removeFilePathPattern(file.url))
      writeFileSync(localPath, data)
    })

    storageData.files.push(...args.files)
    handleWriteStorageDataToJSON(storageData, args.userID)
    event.reply('get-new-local-files-reply')
  })

  ipcMain.on('delete-local-files', (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.files.forEach((file) => {
      const deleteFilePath = path.join(args.storagePath, removeFilePathPattern(file.url))
      unlinkSync(deleteFilePath)
      storageData.files = storageData.files.filter((item) => item.ID !== file.ID)
      handleWriteStorageDataToJSON(storageData, args.userID)
    })
    event.reply('delete-local-files-reply')
  })

  ipcMain.on('move-local-files', (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.files.forEach((file) => {
      const updateIndex = storageData.files.findIndex((item) => item.ID === file.ID)
      const oldFilePath = path.join(
        args.storagePath,
        removeFilePathPattern(storageData.files[updateIndex].url)
      )
      const newFilePath = path.join(args.storagePath, removeFilePathPattern(file.url))
      console.log(oldFilePath, newFilePath)
      renameSync(oldFilePath, newFilePath)
      storageData.files[updateIndex] = file
      handleWriteStorageDataToJSON(storageData, args.userID)
    })

    event.reply('move-local-files-reply')
  })

  ipcMain.on('update-local-folders', (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.folders.forEach(async (folder) => {
      const updateIndex = storageData.folders.findIndex((item) => item.ID === folder.ID)

      request(
        {
          url: `${process.env.MAIN_VITE_BASE_API}/folders/${folder.ID}`,
          encoding: null,
          headers: {
            Authorization: `Bearer ${args.token}`
          }
        },
        (error, response, body) => {
          // write this folder
          const localPath = path.join(args.storagePath, removeFilePathPattern(folder.path))
          const oldFolderPath = path.join(
            args.storagePath,
            removeFilePathPattern(storageData.folders[updateIndex].path)
          )
          console.log(oldFolderPath, localPath)
          rmdirSync(oldFolderPath, { recursive: true })
          mkdirSync(localPath, { recursive: true })

          // Save the zip file

          // Extract the zip file
          const zip = new AdmZip(body)
          zip.extractAllTo(localPath, true)

          // Remove the zip file
          // unlinkSync(zipFilePath)
          storageData.folders[updateIndex] = folder
          handleWriteStorageDataToJSON(storageData, args.userID)
        }
      )
    })
    event.reply('update-local-folders-reply')
  })

  ipcMain.on('get-new-local-folders', (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.folders.forEach(async (folder) => {
      request(
        {
          url: `${process.env.MAIN_VITE_BASE_API}/folders/${folder.ID}`,
          encoding: null,
          headers: {
            Authorization: `Bearer ${args.token}`
          }
        },
        (error, response, body) => {
          // write this folder
          const localPath = path.join(args.storagePath, removeFilePathPattern(folder.path))
          mkdirSync(localPath, { recursive: true })

          // Save the zip file

          // Extract the zip file
          if (isZip(body)) {
            const zip = new AdmZip(body)
            zip.extractAllTo(localPath, true)
          }

          // Remove the zip file
          // unlinkSync(zipFilePath)
          storageData.folders.push(folder)
          handleWriteStorageDataToJSON(storageData, args.userID)
        }
      )
    })
    event.reply('get-new-local-folders-reply')
  })

  ipcMain.on('delete-local-folders', (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.folders.forEach((folder) => {
      const deleteFolderPath = path.join(args.storagePath, removeFilePathPattern(folder.path))
      rmdirSync(deleteFolderPath, { recursive: true })
      storageData.folders = storageData.folders.filter((item) => item.ID !== folder.ID)
      handleWriteStorageDataToJSON(storageData, args.userID)
    })
    event.reply('delete-local-folders-reply')
  })

  ipcMain.on('move-local-folders', (event, args) => {
    const storageData = getStorageJSONData(args.userID)
    args.folders.forEach((folder) => {
      const updateIndex = storageData.folders.findIndex((item) => item.ID === folder.ID)
      const oldFolderPath = path.join(
        args.storagePath,
        removeFilePathPattern(storageData.folders[updateIndex].path)
      )
      const newFolderPath = path.join(args.storagePath, removeFilePathPattern(folder.path))
      renameSync(oldFolderPath, newFolderPath)
      storageData.folders[updateIndex] = folder
      handleWriteStorageDataToJSON(storageData, args.userID)
    })
    event.reply('move-local-folders-reply')
  })

  ipcMain.on('file-added', (_, args) => {
    console.log(123123, args)
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
