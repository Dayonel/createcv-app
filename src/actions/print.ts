'use server';

import { prints } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { count } from 'drizzle-orm';
import { cache } from 'react';

export const print = async () => {
  await db.insert(prints).values({});
};

export const getPrints = cache(async () => {
  const [number] = await db.select({ count: count() }).from(prints);
  return number;
});
