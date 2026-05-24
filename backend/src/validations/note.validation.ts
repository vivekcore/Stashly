import { z } from 'zod';


const tipTapContentSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.object({
    type: z.string(),
    content: z.array(z.any()).optional(),
    attrs: z.record(z.string(), z.any()).optional(),
    marks: z.array(z.any()).optional(),
  })).optional(),
}).loose(); 

export const createNoteSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot be longer than 200 characters')
    .trim(),

  content: tipTapContentSchema,

  tags: z.array(z.string().trim()).max(10).optional().default([]),
});

export const updateNoteSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot be longer than 200 characters')
    .trim()
    .optional(),

  content: tipTapContentSchema.optional(),

  tags: z.array(z.string().trim()).max(10).optional(),

  isArchived: z.boolean().optional(),
}).refine(data => {
  return Object.keys(data).length > 0;
}, {
  message: "At least one field must be provided for update",
});