'use server';

import { resumes } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { EditResumeSchema } from '@/schemas/edit-resume-schema';
import { z } from 'zod';
import data from '../data/template1.json';
import { and, eq } from 'drizzle-orm';

export const createResume = async (
  values: z.infer<typeof EditResumeSchema>,
  userId: string
) => {
  const validatedFields = EditResumeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name } = validatedFields.data;

  const json = JSON.stringify(data);
  const [row] = await db
    .insert(resumes)
    .values({
      name,
      json,
      userId,
    })
    .returning();

  return { id: row.id };
};

export const editResume = async (
  values: z.infer<typeof EditResumeSchema>,
  json: string,
  id: string,
  userId: string
) => {
  const validatedFields = EditResumeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name } = validatedFields.data;

  await db
    .update(resumes)
    .set({ name, json })
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));
};

export const deleteResume = async (id: string, userId: string) => {
  await db
    .delete(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));
};
