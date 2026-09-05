import DatabaseConstructor, { Database } from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

let db: Database;

export function getConnection(): Database {
  if (!db) {
    const dbPath = path.join(app.getPath('userData'), 'casher_storage.sqlite');
    db = new DatabaseConstructor(dbPath);
  }
  return db;
}