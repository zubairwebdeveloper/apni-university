import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers and underscores only"),
  phone: z.string().max(20).optional().or(z.literal("")),
  bio: z.string().max(280, "Bio must be under 280 characters").optional().or(z.literal("")),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  location: z.string().max(80).optional().or(z.literal("")),
  socialLinks: z
    .object({
      github: z.string().max(120).optional().or(z.literal("")),
      linkedin: z.string().max(120).optional().or(z.literal("")),
      twitter: z.string().max(120).optional().or(z.literal("")),
      instagram: z.string().max(120).optional().or(z.literal("")),
    })
    .optional(),
});
