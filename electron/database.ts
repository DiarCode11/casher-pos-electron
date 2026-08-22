import DatabaseConstructor, { Database } from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

let db: Database;

export function initDatabase(): void {
  // Menyimpan file database dengan aman di folder AppData lokal komputer user
  const dbPath = path.join(app.getPath('userData'), 'casher_storage.sqlite');
  
  db = new DatabaseConstructor(dbPath);
  
  // Membuat tabel produk otomatis jika belum ada
  db.prepare(`
    CREATE TABLE IF NOT EXISTS produk (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      harga INTEGER NOT NULL
    )
  `).run();
}

// Fungsi mengambil seluruh data produk dari SQLite
export function ambilSemuaProduk(): any[] {
  return db.prepare('SELECT * FROM produk').all();
}

// Fungsi menambah baris produk baru ke SQLite
export function tambahProduk(nama: string, harga: number): void {
  db.prepare('INSERT INTO produk (nama, harga) VALUES (?, ?)').run(nama, harga);
}
