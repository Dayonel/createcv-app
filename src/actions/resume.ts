'use server';

import { resumes } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { count, eq } from 'drizzle-orm';
import { cache } from 'react';

export const getResumes = cache(
  async (userId: string, page = 1, pageSize = 10) => {
    const condition = eq(resumes.userId, userId);

    const [total] = await db
      .select({ count: count() })
      .from(resumes)
      .where(condition);

    const items = await db
      .select()
      .from(resumes)
      .where(condition)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return { count: total.count, items };
  }
);
