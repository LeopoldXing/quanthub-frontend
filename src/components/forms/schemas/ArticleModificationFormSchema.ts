import { z } from 'zod';

// define Zod schema
export const articleModificationFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(50, "title can not exceed 50 characters."),
  subtitle: z.string().max(80, "subtitle can not exceed 80 characters").nullable(),
  contentHtml: z.string().nullable(),
  contentText: z.string().nullable(),
  contentJson: z.string().nullable(),
  categoryName: z.string().nullable(),
  pictureLinkList: z.array(z.string().url()).nullable(),
  attachmentLink: z.string().url().nullable(),
  tagNameList: z.array(z.string()).nullable()
});

// define form data type
export type ArticleModificationFormZodDataType = z.infer<typeof articleModificationFormSchema>;
