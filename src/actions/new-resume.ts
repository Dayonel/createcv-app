'use server';

import { resumes } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { NewResumeSchema } from '@/schemas/new-resume-schema';
import { z } from 'zod';
import data from '../data/template1.json';

export const newResume = async (
  values: z.infer<typeof NewResumeSchema>,
  userId: string
) => {
  const validatedFields = NewResumeSchema.safeParse(values);

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
