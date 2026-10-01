"use client";

import { instructorsConfig } from "@/lib/resources/instructors";
import { instructorService } from "@/lib/services/instructorService";
import { useResource } from "./useResource";

export const useInstructors = () => useResource(instructorsConfig, instructorService);
