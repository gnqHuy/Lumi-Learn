// scripts/set-ip.js
const fs = require('fs');
const os = require('os');
const interfaces = os.networkInterfaces();

let localIP = '127.0.0.1';

for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      localIP = net.address;
    }
  }
}

console.log(`✔ Wrote IP: ${localIP} to .env`);
