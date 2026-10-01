import { z } from "zod";
import { BLOG_CATEGORIES } from "@/lib/constants/blog";

export const blogSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(120, "Keep the title under 120 characters"),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens").optional().or(z.literal("")),
  excerpt: z.string().trim().min(20, "Write at least 20 characters").max(200, "Excerpt can't exceed 200 characters"),
  content: z.string().trim().min(50, "The post needs at least 50 characters"),
  category: z.enum(BLOG_CATEGORIES, { message: "Pick a category" }),
  tags: z.string().optional(),
  coverImage: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
  author: z.string().trim().min(2, "Enter the author's name"),
  seoTitle: z.string().trim().max(60, "Keep SEO titles under 60 characters").optional(),
  seoDescription: z.string().trim().max(160, "Keep descriptions under 160 characters").optional(),
  scheduledAt: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
});
