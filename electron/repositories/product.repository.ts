import { ProductInterface } from "../../src/lib/interfaces/product.interface";
import { getConnection } from "../database/connection";

export function getProducts(): ProductInterface[] {
  const db = getConnection();
  return db.prepare('SELECT * FROM products WHERE deleted_at IS NULL').all() as ProductInterface[];
}

export function addProduct(data: Partial<ProductInterface>): void {
  const db = getConnection();
  const { nama, description, harga, stok, unit, category } = data;
  db.prepare(
    'INSERT INTO products (nama, description, harga, stok, unit, category) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(nama, description ?? null, harga, stok ?? 0, unit ?? 'pcs', category ?? null);
}

export function updateProduct(data: ProductInterface): void {
  const db = getConnection();
  const { id, nama, description, harga, stok, unit, category } = data;
  db.prepare(
    'UPDATE products SET nama = ?, description = ?, harga = ?, stok = ?, unit = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(nama, description ?? null, harga, stok, unit, category ?? null, id);
}

export function deleteProduct(id: number): void {
    const db = getConnection();
    db.prepare('UPDATE products SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
}