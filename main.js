const { app, BrowserWindow } = require('electron')
const contextMenu = require('electron-context-menu');

function createWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '/favicon.ico',
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

contextMenu({
  menu: (actions, props, browserWindow, dictionarySuggestions) => [
    ...dictionarySuggestions,
    actions.separator(),
    actions.copyLink({
      transform: content => `modified_link_${content}`
    }),
    actions.separator(),
    actions.copy({
      transform: content => `modified_copy_${content}`
    }),
    {
      label: 'Invisible',
      visible: false
    },
    actions.paste({
      transform: content => `modified_paste_${content}`
    })
  ]
})

let mainWindow;
(async () => { await app.whenReady() })