'use server';

import { auth } from '@/auth';
import { resumes } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { templateJson } from '@/lib/template';
import { EditResumeSchema } from '@/schemas/edit-resume-schema';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';

type Values = z.infer<typeof EditResumeSchema>;

export const createResume = async (values: Values) => {
  const userId = (await auth())?.user?.id;
  if (!userId) return { error: 'Unauthorized' };

  const validatedFields = EditResumeSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const [row] = await db
    .insert(resumes)
    .values({ name: validatedFields.data.name, json: templateJson, userId })
    .returning();

  return { id: row.id };
};

export const editResume = async (values: Values, json: string, id: string) => {
  const userId = (await auth())?.user?.id;
  if (!userId) return { error: 'Unauthorized' };

  const validatedFields = EditResumeSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid fields!' };

  await db
    .update(resumes)
    .set({ name: validatedFields.data.name, json })
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));
};

export const deleteResume = async (id: string) => {
  const userId = (await auth())?.user?.id;
  if (!userId) return { error: 'Unauthorized' };

  await db
    .delete(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));
};
