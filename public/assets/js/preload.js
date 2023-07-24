const { contextBridge, ipcRenderer } = require('electron');
const ip = require('ip');
const path = require('path');
const { SerialPort } = require('serialport');
const log = require('electron-log');

const listSerialPort = async () => {
    const _serialPortList = await SerialPort.list()
    return _serialPortList;
}

contextBridge.exposeInMainWorld('electronPort', async () => {
    let getList = await listSerialPort();
})


contextBridge.exposeInMainWorld('api', {
    sendData: (data) => {
        ipcRenderer.send('send-user-data', JSON.stringify(data))
    },
})