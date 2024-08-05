import { z } from "zod";

export const contactSchema = z.object({
  phoneNumber: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
