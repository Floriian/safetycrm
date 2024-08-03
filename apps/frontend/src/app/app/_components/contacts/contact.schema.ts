import { z } from "zod";

export const contactSchema = z.object({
  contactPhoneNumber: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
