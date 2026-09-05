import { Database } from 'better-sqlite3';

export function runMigrations(db: Database): void {
    // db.prepare(`DROP TABLE IF EXISTS products`).run();
    db.prepare(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT NOT NULL,
            description TEXT,
            harga INTEGER NOT NULL,
            unit TEXT DEFAULT 'pcs',
            category TEXT DEFAULT NULL,
            stok INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME DEFAULT NULL
        )
    `).run();
}