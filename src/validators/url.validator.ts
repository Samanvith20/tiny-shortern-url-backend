import { z } from "zod";




export const createUrlSchema = z.object({
  url: z
    .string()
    .url("Invalid URL")
    .refine(
      (value) =>
        value.startsWith("http://") ||
        value.startsWith("https://"),
      {
        message: "Only http and https URLs are allowed",
      }
    ),
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>;