const { electron } = require('electron');
const fs = require('fs');
const PublicIp = require('nodejs-publicip');
const ip = require('ip');

const getPublicIp = () => {
    return new PublicIp().queryPublicIPAddresses().then((result) => {
        return {
            local: ip.address(),
            v4: result.ipv4,
            v6: result.ipv6,
        }
    }).catch(err => err);
}

module.exports = {
    getPublicIp,
}