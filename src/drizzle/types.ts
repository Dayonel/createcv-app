import { InferSelectModel } from 'drizzle-orm';
import { resumes } from './schema';

export type Resume = InferSelectModel<typeof resumes>;
