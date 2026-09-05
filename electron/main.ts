import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import { addProduct, deleteProduct, getProducts, initDatabase } from './startup';
import { ProductHandlers } from './ipcs/product.ipc';


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    webPreferences: {
      // Mengarahkan ke file preload.js hasil kompilasi dari Vite
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
      contextIsolation: true
    },
  });

  // Jika dalam mode pengembangan (dev), load URL server lokal dari Vite
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Jika dalam mode produksi (build), load file HTML statis
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
  // 1. Nyalakan koneksi database SQLite
  initDatabase();

  // 2. Pasang Listener IPC untuk melayani permintaan dari React frontend
  ProductHandlers()

  // 3. Munculkan jendela aplikasi kasir
  createWindow();
});

// Menutup aplikasi sepenuhnya jika semua jendela ditutup (Kecuali macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
