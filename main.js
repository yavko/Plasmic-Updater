const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 300,
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'favicon.ico',
    resizable: false,
    autoHideMenuBar: true
  })
  win.loadFile('index.html')
}

function hideMenuBar() {
}

app.whenReady().then(createWindow).then(hideMenuBar)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


let mainWindow;
(async () => { await app.whenReady() })