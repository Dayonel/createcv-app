import { and, eq, gte, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { cvRequests } from '@/drizzle/schema';

export const LIMIT = 60;
export const WINDOW_MS = 60 * 60 * 1000;

export type Limiter = (ip: string) => Promise<boolean>;

/** Counts accepted calls per caller over a rolling window, using the cv_request rows as the record. */
export function d1Limiter(binding: D1Database): Limiter {
  const db = drizzle(binding);
  return async (ip) => {
    const since = new Date(Date.now() - WINDOW_MS);
    const [row] = await db
      .select({ n: sql<number>`count(*)` })
      .from(cvRequests)
      .where(and(eq(cvRequests.ip, ip), gte(cvRequests.createdAt, since)));
    if (Number(row?.n ?? 0) >= LIMIT) return false;
    await db.insert(cvRequests).values({ ip });
    return true;
  };
}
