import { z } from "zod";
import { CATEGORIES } from "@/lib/constants/course";

const url = z.string().trim().url("Enter a valid URL").optional().or(z.literal(""));

export const instructorSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80, "Name is too long"),
  headline: z.string().trim().min(3, "Add a short headline").max(100, "Keep the headline under 100 characters"),
  specialty: z.enum(CATEGORIES, { message: "Pick a specialty" }),
  bio: z.string().trim().min(30, "Write at least 30 characters").max(1500, "Bio is too long"),
  experience: z.coerce.number().min(0, "Can't be negative").max(60, "That seems too high"),
  email: z.string().trim().email("Enter a valid email address"),
  avatar: url,
  linkedin: url,
  tags: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
});
