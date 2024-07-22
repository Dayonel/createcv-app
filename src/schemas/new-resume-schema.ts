import { z } from 'zod';

export const NewResumeSchema = z.object({
  id: z.string().min(36, { message: 'Id is required.' }),
  name: z.string().min(5, { message: 'Name is required.' }),
});
