import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  password: z.string().min(6).optional(),
});
export type User = z.infer<typeof userSchema>;

export const createOrUpdateUserSchema = z.discriminatedUnion("isNew", [
  userSchema.extend({ isNew: z.literal(true), password: z.string().min(6) }),
  userSchema.extend({
    isNew: z.literal(false),
    password: z.string().optional(),
  }),
]);
export type CreateOrUpdateUserSchema = z.infer<typeof createOrUpdateUserSchema>;
