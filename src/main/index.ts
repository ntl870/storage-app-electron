import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import AdmZip from 'adm-zip'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import getMAC from 'getmac'
import * as os from 'os'
import { join } from 'path'
import request from 'request'
import icon from '../../resources/icon.png?asset'
import StartWatcher from './processes'

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
        console.log(url)
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
app.whenReady().then(() => {
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

  const dirPath = '/home/ntl870/Inverted_Dep'
  StartWatcher(dirPath, mainWindow)

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
