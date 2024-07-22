import { NewResumeSchema } from '@/schemas/new-resume-schema';
import { z } from 'zod';

export const newResume = async (values: z.infer<typeof NewResumeSchema>) => {
  const validatedFields = NewResumeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name } = validatedFields.data;

  return new Promise((resolve: (value: void) => void) => {
    setTimeout(() => {
      return resolve();
    }, 2000);
  });
};
