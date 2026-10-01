"use client";

import { blogConfig } from "@/lib/resources/blog";
import { blogService } from "@/lib/services/blogService";
import { useResource } from "./useResource";

export const useBlog = () => useResource(blogConfig, blogService);
