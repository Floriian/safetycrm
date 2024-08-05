import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().optional(),
  phoneNumber: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
