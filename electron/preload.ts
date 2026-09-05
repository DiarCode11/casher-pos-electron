import { contextBridge, ipcRenderer } from 'electron';
import type { ProductInterface } from '../src/lib/interfaces/product.interface';

// Mengekspos API kustom dengan nama 'posAPI' ke objek global 'window' di React
contextBridge.exposeInMainWorld('posAPI', {
  getProducts: () => ipcRenderer.invoke('get-products'),
  addProduct: (data: Partial<ProductInterface>) =>
    ipcRenderer.invoke('add-product', data),
  updateProduct: (data: ProductInterface) =>
    ipcRenderer.invoke('update-product', data),
  deleteProduct: (id: number) => ipcRenderer.invoke('delete-product', id),
});