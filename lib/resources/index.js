import { blogService } from "@/lib/services/blogService";
import { careerService } from "@/lib/services/careerService";
import { instructorService } from "@/lib/services/instructorService";
import { reviewService } from "@/lib/services/reviewService";
import { blogConfig } from "./blog";
import { careersConfig } from "./careers";
import { instructorsConfig } from "./instructors";
import { reviewsConfig } from "./reviews";

// Pages pass a string key (functions can't cross the server→client boundary).
export const resources = {
  instructors: { config: instructorsConfig, service: instructorService },
  reviews: { config: reviewsConfig, service: reviewService },
  blog: { config: blogConfig, service: blogService },
  careers: { config: careersConfig, service: careerService },
};
