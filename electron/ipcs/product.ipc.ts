import { ipcMain } from 'electron';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../startup';
import { ProductInterface } from '../../src/lib/interfaces/product.interface';

export function ProductHandlers(): void {
  ipcMain.handle('get-products', () => {
    return getProducts();
  });

  ipcMain.handle('add-product', (_event, data: Partial<ProductInterface>) => {
    if (!data || typeof data.nama !== 'string' || data.nama.trim().length < 2) {
      throw new Error('Product name is invalid');
    }

    if (typeof data.harga !== 'number' || !Number.isInteger(data.harga) || data.harga <= 0) {
      throw new Error('Product price is invalid');
    }

    addProduct({
      ...data,
      nama: data.nama.trim(),
      description: data.description?.trim() ?? '',
      stok: data.stok ?? 0,
      unit: data.unit ?? 'pcs',
      category: data.category ?? undefined,
    });
    return { success: true };
  });

  ipcMain.handle('delete-product', (_event, id: number) => {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Product ID is invalid');
    }

    deleteProduct(id);
    return { success: true };
  });

  ipcMain.handle('update-product', (_event, data: ProductInterface) => {
    if (!data || !Number.isInteger(data.id) || data.id <= 0) {
      throw new Error('Product ID is invalid');
    }

    if (typeof data.nama !== 'string' || data.nama.trim().length < 2) {
      throw new Error('Product name is invalid');
    }

    if (!Number.isInteger(data.harga) || data.harga <= 0) {
      throw new Error('Product price is invalid');
    }

    if (!Number.isInteger(data.stok) || data.stok < 0) {
      throw new Error('Product stock is invalid');
    }

    updateProduct({
      ...data,
      nama: data.nama.trim(),
      description: data.description?.trim(),
      unit: data.unit.trim() || 'pcs',
      category: data.category?.trim() || undefined,
    });
    return { success: true };
  });
}