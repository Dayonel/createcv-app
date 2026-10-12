'use server';

import { auth } from '@/auth';
import { resumes } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { count, eq, and } from 'drizzle-orm';

export const getResumes = async (page = 1, pageSize = 10) => {
  const userId = (await auth())?.user?.id;
  if (!userId) return { count: 0, items: [] };

  const condition = eq(resumes.userId, userId);

  const [[total], items] = await Promise.all([
    db.select({ count: count() }).from(resumes).where(condition),
    db
      .select()
      .from(resumes)
      .where(condition)
      .limit(pageSize)
      .offset((page - 1) * pageSize),
  ]);

  return { count: total.count, items };
};

export const getResume = async (id: string) => {
  const userId = (await auth())?.user?.id;
  if (!userId) return;

  const [row] = await db
    .select()
    .from(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));

  return row;
};
