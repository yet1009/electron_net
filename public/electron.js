const {app, BrowserWindow, ipcMain, net } = require('electron')
const log = require('electron-log');
let path = require('path');
let Info = require('../public/electron/info');
let { getPublicIp } = require('../public/common/system')
const { io } = require('socket.io-client');

const socket = io('http://13.124.239.21:4005');

let mainWindow;

const { publicPath } = Info()


const createWindow = async () => {
    let _mainWindow = new BrowserWindow({
        width: 1080,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            webSecurity: false,
            preload: path.join(publicPath, 'assets', 'js', 'preload.js')
        }
    })

    // console.log(publicPath)
     await _mainWindow.loadURL('http://localhost:4090')
    // _mainWindow.loadFile(path.join(publicPath), 'index.html')

    return _mainWindow;
}

// await client.connect();
// app.on('ready', async () => {
//     const _localIp = await getPublicIp()
//     log.log(_localIp)
//
//     mainWindow = createWindow();
//     await mainWindow.webContents.openDevTools({ mode: 'right' });
//     await mainWindow.webContents.on('did-finish-load', () => {
//         connectToRedis()
//     })
// })

ipcMain.on('send-user-data', async (event, args) => {
    // log.log(args)
    let data = args
    log.log(data)
    await socket.emit('send_name', data)
})

ipcMain.on('get-user-data', async () => {
    await socket.emit('get_name')
})

app.whenReady().then(async () => {

    const _localIp = await getPublicIp()
    log.log(_localIp)

    mainWindow = await createWindow();
    mainWindow.webContents.openDevTools({ mode: 'right' });
    mainWindow.webContents.on('did-finish-load', () => {
        // socket.on('connect', async () => {
        //     console.log(socket.id)
        // })

    })
})


socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('send_name',(data) => {
    console.log('이름 받아라~~', data)
})

socket.on('get_name', (data) => {
    console.log('수신한 이름은........', data)
})