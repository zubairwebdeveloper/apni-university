import { BookOpen, CalendarDays, Check, EyeOff, MessageSquareQuote, X } from "lucide-react";
import StarRating from "@/components/resource/StarRating";
import { RATING_OPTIONS } from "@/lib/constants/review";
import { STATUS_SETS } from "@/lib/constants/status";
import { formatDate } from "@/lib/utils/course";
import { reviewSchema } from "@/lib/validations/reviewValidation";
import { baseSorts, featuredFilter, statusOptions } from "./shared";

export const reviewsConfig = {
  key: "reviews",
  collection: "reviews",
  singular: "Review",
  plural: "Reviews",
  base: "/dashboard/reviews",
  icon: MessageSquareQuote,
  blurb: "Moderate what students say about your programs.",
  searchHint: "Search by reviewer",
  titleField: "reviewer",
  imageField: "avatar",
  imageShape: "none",
  bodyField: "comment",
  subtitle: (i) => [i.reviewerRole, i.course].filter(Boolean).join(" · "),
  featurable: true,
  duplicable: false,
  statuses: STATUS_SETS.moderation,
  defaultStatus: "pending",
  statusActions: [
    { status: "approved", label: "Approve", icon: Check, bulk: true },
    { status: "rejected", label: "Reject", icon: X, bulk: true },
    { status: "hidden", label: "Hide", icon: EyeOff, bulk: true },
  ],
  sorts: {
    ...baseSorts,
    high: { label: "Highest rating", field: "rating", dir: "desc" },
    low: { label: "Lowest rating", field: "rating", dir: "asc" },
  },
  filters: [{ key: "rating", label: "Rating", type: "number", options: RATING_OPTIONS }, featuredFilter],
  columns: [
    { key: "rating", label: "Rating", render: (i) => <StarRating value={i.rating} size="size-3.5" /> },
    { key: "course", label: "Course", render: (i) => i.course },
  ],
  renderExtra: (i, large) => <StarRating value={i.rating} size={large ? "size-6" : "size-4"} />,
  meta: (i) => [
    { icon: BookOpen, text: i.course },
    { icon: CalendarDays, text: formatDate(i.createdAt) },
  ],
  facts: (i) => [
    { label: "Course", value: i.course },
    { label: "Rating", value: `${i.rating} / 5` },
    { label: "Reviewer role", value: i.reviewerRole },
    { label: "Submitted", value: formatDate(i.createdAt) },
  ],
  detail: (i) => [{ title: "Review", text: i.comment }],
  schema: reviewSchema,
  defaults: { reviewer: "", reviewerRole: "", course: "", rating: 0, comment: "", avatar: "", featured: false, status: "pending" },
  sections: [
    {
      title: "Reviewer",
      fields: [
        { name: "reviewer", label: "Name", placeholder: "e.g. Hamza Ali" },
        { name: "reviewerRole", label: "Role or batch", placeholder: "e.g. BS CS, 2025" },
        { name: "avatar", label: "Photo URL", span: 2, placeholder: "https://…", description: "Optional." },
      ],
    },
    {
      title: "Review",
      fields: [
        { name: "course", label: "Course", span: 2, placeholder: "Which course is this about?" },
        { name: "rating", label: "Rating", type: "rating", span: 2 },
        { name: "comment", label: "Comment", type: "textarea", span: 2, counter: 800, rows: 5, placeholder: "What did the student say?" },
      ],
    },
    {
      title: "Moderation",
      fields: [
        { name: "featured", label: "Featured review", type: "switch", description: "Show on the homepage testimonials." },
        { name: "status", label: "Status", type: "select", options: statusOptions(STATUS_SETS.moderation) },
      ],
    },
  ],
};
