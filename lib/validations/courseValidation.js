import { z } from "zod";
import { CATEGORIES, COURSE_STATUS, LEVELS } from "@/lib/constants/course";

export const courseSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title can't exceed 100 characters"),
  description: z.string().trim().min(20, "Describe the course in at least 20 characters").max(2000, "Description is too long"),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: "Pick a category" }) }),
  level: z.enum(LEVELS, { errorMap: () => ({ message: "Pick a level" }) }),
  price: z.coerce.number({ invalid_type_error: "Enter a price" }).min(0, "Price can't be negative"),
  duration: z.coerce.number({ invalid_type_error: "Enter hours" }).min(0.5, "Minimum 0.5 hours").max(1000, "Too long"),
  thumbnail: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
  tags: z.string().optional(),
  status: z.enum([COURSE_STATUS.DRAFT, COURSE_STATUS.PUBLISHED, COURSE_STATUS.ARCHIVED]),
});

export const courseDefaults = {
  title: "",
  description: "",
  category: undefined,
  level: undefined,
  price: 0,
  duration: 1,
  thumbnail: "",
  tags: "",
  status: COURSE_STATUS.DRAFT,
};
