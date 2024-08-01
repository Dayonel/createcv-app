import { z } from 'zod';

export const NewResumeSchema = z.object({
  name: z.string().min(5, { message: 'Name is required.' }),
});
