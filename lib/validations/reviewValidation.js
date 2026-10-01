import { z } from "zod";

export const reviewSchema = z.object({
  reviewer: z.string().trim().min(2, "Enter the reviewer's name").max(80),
  reviewerRole: z.string().trim().max(80).optional(),
  course: z.string().trim().min(2, "Which course is this about?").max(120),
  rating: z.coerce.number().int().min(1, "Pick a rating").max(5),
  comment: z.string().trim().min(10, "Write at least 10 characters").max(800, "Review is too long"),
  avatar: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  featured: z.boolean(),
  status: z.enum(["pending", "approved", "rejected", "hidden"]),
});
