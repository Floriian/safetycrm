import { z } from "zod";

export const authSchema = z.object({
  email: z.string({ required_error: "Required." }).email(),
  password: z.string().min(6),
});

export type AuthSchema = z.infer<typeof authSchema>;
