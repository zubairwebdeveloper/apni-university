import { z } from "zod";

export const notificationPreferencesSchema = z.object({
  emailMarketing: z.boolean(),
  emailProductUpdates: z.boolean(),
  emailSecurityAlerts: z.boolean(),
});

export const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.string().min(2).max(10),
});
