import { z } from 'zod';

// BaseCV is this project's own model, so these mirror
// src/components/templates/template1/types/* rather than inventing fields.
const Key = z.object({ key: z.string() });

const Image = Key.extend({ src: z.string(), href: z.string().optional() });
const Skill = Key.extend({ value: z.string() });
const Language = Key.extend({
  value: z.string().optional(),
  level: z.string().optional(),
  rating: z.number().optional(),
});

// Strict on purpose: a single and a double section are told apart by the keys of their content
// alone. Without this a double section would validate as a single one and silently lose its skills.
const SingleContent = Key.extend({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  date: z.string().optional(),
  topic: z.string().optional(),
  description: z.string().optional(),
  tech: z.string().optional(),
  images: z.array(Image).optional(),
}).strict();

const DoubleContent = Key.extend({
  name: z.string().optional(),
  type: z.string().optional(),
  skills: z.array(Skill).optional(),
  languages: z.array(Language).optional(),
}).strict();

const Section = z.union([
  Key.extend({ name: z.string().optional(), type: z.string(), content: z.array(SingleContent).optional() }),
  Key.extend({ type: z.string(), content: z.array(DoubleContent).optional() }),
]);

export const BaseCvSchema = z.object({
  color: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  contacts: z.array(Key.extend({ text: z.string(), icon: z.string() })),
  summary: z.string().optional(),
  sections: z.array(Section),
});

export type BaseCv = z.infer<typeof BaseCvSchema>;
