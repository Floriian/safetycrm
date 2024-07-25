import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
