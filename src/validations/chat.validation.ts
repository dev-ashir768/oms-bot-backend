import { z } from "zod/v3";

export const chatValidation = z.object({
  body: z.object({
    question: z
      .string({
        required_error: "Question is required",
        invalid_type_error: "Question must be a string",
      })
      .min(2, "Question must be at least 2 characters long")
      .max(1000, "Question must be at most 1000 characters long"),
  }),
});

// ✅ Type extraction bhi fix kiya
export type ChatValidationType = z.infer<typeof chatValidation>["body"];