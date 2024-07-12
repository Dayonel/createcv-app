import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/drizzle/schema';

export interface Env {
  DB: D1Database;
}

export const db = drizzle(process.env.DB, { schema });
