const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  deleteFiles: () => ipcRenderer.send('delete-files')
});
