const { app } = require('electron')
const log = require('electron-log');
const path = require('path');

module.exports = () => {
    const publicPath = path.join(__dirname, '..');

    return {
        publicPath
    }
}
