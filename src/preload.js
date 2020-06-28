// /* eslint-disable @typescript-eslint/no-var-requires */
// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("api", {
//   send: (channel, data) => {
//     ipcRenderer.send(channel, data);
//   },
//   // renderer側の受信用、funcはコールバック関数
//   on: (channel, func) => {
//     ipcRenderer.on(channel, (event, ...args) => func(...args));
//   },
// });
