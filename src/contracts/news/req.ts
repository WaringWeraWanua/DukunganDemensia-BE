import { z } from "zod";

export const CreateNewsSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
})

export type CreateNewsSchemaType = z.infer<typeof CreateNewsSchema>
