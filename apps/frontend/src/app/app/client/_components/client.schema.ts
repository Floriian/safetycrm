import { z } from "zod";
import { userSchema } from "../../user/_components/user.schema";
import { contactSchema } from "../../_components";

export const clientSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Field required." }),
  contact: z.array(contactSchema).optional(),
  user: userSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Client = z.infer<typeof clientSchema>;
