import { z } from "zod";
import { DEPARTMENTS, EXPERIENCE_LEVELS, JOB_TYPES, WORK_MODES } from "@/lib/constants/career";

export const careerSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(100),
    department: z.enum(DEPARTMENTS, { message: "Pick a department" }),
    type: z.enum(JOB_TYPES, { message: "Pick a job type" }),
    workMode: z.enum(WORK_MODES, { message: "Pick a work mode" }),
    location: z.string().trim().min(2, "Enter a location"),
    experience: z.enum(EXPERIENCE_LEVELS, { message: "Pick an experience level" }),
    salaryMin: z.coerce.number().min(0, "Can't be negative"),
    salaryMax: z.coerce.number().min(0, "Can't be negative"),
    deadline: z.string().optional(),
    description: z.string().trim().min(30, "Describe the role in at least 30 characters").max(3000),
    requirements: z.string().trim().min(10, "List at least one requirement"),
    applyEmail: z.string().trim().email("Enter a valid email address"),
    featured: z.boolean(),
    status: z.enum(["draft", "published", "archived"]),
  })
  .refine((d) => !d.salaryMax || d.salaryMax >= d.salaryMin, {
    message: "Maximum must be at least the minimum",
    path: ["salaryMax"],
  });
