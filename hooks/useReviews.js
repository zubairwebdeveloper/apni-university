"use client";

import { reviewsConfig } from "@/lib/resources/reviews";
import { reviewService } from "@/lib/services/reviewService";
import { useResource } from "./useResource";

export const useReviews = () => useResource(reviewsConfig, reviewService);
