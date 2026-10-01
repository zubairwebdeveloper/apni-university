import { blogService } from "@/lib/services/blogService";
import { courseService } from "@/lib/services/courseService";
import { instructorService } from "@/lib/services/instructorService";
import { reviewService } from "@/lib/services/reviewService";
import { fallbackCourses, fallbackFaculty, fallbackPosts, fallbackReviews } from "@/data/home";

const withTimeout = (p, ms = 5000) =>
  Promise.race([p, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);

// Returns live Firestore rows when there are any, otherwise sample content. The page never breaks.
async function pick(fetcher, fallback) {
  try {
    const rows = await withTimeout(fetcher());
    return rows?.length ? { items: rows, live: true } : { items: fallback, live: false };
  } catch {
    return { items: fallback, live: false };
  }
}

const featuredFirst = (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0);

export async function getHomeData() {
  const [courses, faculty, reviews, posts] = await Promise.all([
    pick(async () => {
      const r = await courseService.list({ filters: { status: "published", category: "all", level: "all", sort: "newest" }, search: "" });
      return r.courses.sort((a, b) => (b.students ?? 0) - (a.students ?? 0)).slice(0, 3);
    }, fallbackCourses),
    pick(async () => {
      const r = await instructorService.list({ filters: { status: "published" }, sort: "newest" });
      return r.items.sort(featuredFirst).slice(0, 4);
    }, fallbackFaculty),
    pick(async () => {
      const r = await reviewService.list({ filters: { status: "approved" }, sort: "newest" });
      return r.items.sort(featuredFirst).slice(0, 3);
    }, fallbackReviews),
    pick(async () => {
      const r = await blogService.list({ filters: { status: "published" }, sort: "newest" });
      return r.items.sort(featuredFirst).slice(0, 3);
    }, fallbackPosts),
  ]);
  return { courses: courses.items, faculty: faculty.items, reviews: reviews.items, posts: posts.items };
}
