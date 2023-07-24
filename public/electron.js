const {app, BrowserWindow, ipcMain } = require('electron')
const log = require('electron-log');
let path = require('path');
let Info = require('../public/electron/info');
let { getPublicIp } = require('../public/common/system')

let redis = require('redis');

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

ipcMain.on('send-user-data', (event, args) => {
    // log.log(args)
    let data = JSON.parse(args)

})


async function connectToRedis() {
    const client = redis.createClient({
        host: '172.31.34.1' ?? 'localhost',
        port: 26379 ?? 6379
    })

    await client.on('connect', () => {
        console.log('Connected to Redis')
        mainWindow.webContents.send('redis-connected', 'Connected to Redis!');
    })

}

app.whenReady().then(async () => {

    const _localIp = await getPublicIp()
    log.log(_localIp)

    mainWindow = await createWindow();
    mainWindow.webContents.openDevTools({ mode: 'right' });
    mainWindow.webContents.on('did-finish-load', () => {
        connectToRedis()
    })
})
