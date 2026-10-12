'use server';

import { prints } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { count } from 'drizzle-orm';
import { cache } from 'react';

// react-doctor-disable-next-line react-doctor/server-auth-actions
export const print = async () => {
  try {
    const [row] = await db.insert(prints).values({}).returning();
    return row.id;
  } catch {
    return 0;
  }
};

export const getPrints = cache(async () => {
  try {
    const [number] = await db.select({ count: count() }).from(prints);
    return number;
  } catch {
    return { count: 0 };
  }
});
