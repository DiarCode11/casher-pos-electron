import { getConnection } from './database/connection';
import { runMigrations } from './database/schema';

export function initDatabase(): void {
  const db = getConnection();
  runMigrations(db);
}

export * from './repositories/product.repository';