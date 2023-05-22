import chokidar from 'chokidar'
import { BrowserWindow } from 'electron'
import { handleWriteToNewLocalChanges, getNewLocalChangesJSONData } from '.'

function StartWatcher(path: string, mainWindow: BrowserWindow, userID: string) {
  const watcher = chokidar.watch(path, {
    // eslint-disable-next-line no-useless-escape
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true
  })

  function onWatcherReady() {
    console.info('From here can you check for real changes, the initial scan has been completed.')
  }

  watcher
    .on('add', function (path) {
      const storageData = getNewLocalChangesJSONData(userID)
      storageData.files.push({
        path,
        status: 'added'
      })
      mainWindow.webContents.send('file-added', path)
      handleWriteToNewLocalChanges(storageData, userID)
    })
    .on('addDir', function (path) {
      console.log('Directory', path, 'has been added')
      mainWindow.webContents.send('directory-added', path)
    })
    .on('change', function (path) {
      console.log('File', path, 'has been changed')
      mainWindow.webContents.send('file-changed', path)
    })
    .on('unlink', function (path) {
      console.log('File', path, 'has been removed')
      mainWindow.webContents.send('file-removed', path)
    })
    .on('unlinkDir', function (path) {
      console.log('Directory', path, 'has been removed')
      mainWindow.webContents.send('directory-removed', path)
    })
    .on('error', function (error) {
      console.log('Error happened', error)
    })
    .on('ready', onWatcherReady)
}

export default StartWatcher
