import { z } from "zod";

export const baseRuleSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Rule = z.infer<typeof baseRuleSchema> & {
  children?: Rule[];
};

export const ruleSchema: z.ZodType<Rule> = baseRuleSchema.extend({
  children: z.lazy(() => ruleSchema.array()).optional(),
});