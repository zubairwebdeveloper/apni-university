"use client";

import { careersConfig } from "@/lib/resources/careers";
import { careerService } from "@/lib/services/careerService";
import { useResource } from "./useResource";

export const useCareers = () => useResource(careersConfig, careerService);
