import { contextBridge, ipcRenderer } from 'electron';

// Mengekspos API kustom dengan nama 'posAPI' ke objek global 'window' di React
contextBridge.exposeInMainWorld('posAPI', {
  getProduk: () => ipcRenderer.invoke('ambil-produk'),
  addProduk: (nama: string, harga: number) => ipcRenderer.invoke('tambah-produk', nama, harga)
});