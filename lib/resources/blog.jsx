import { CalendarClock, FileText, Tag, User } from "lucide-react";
import { BLOG_CATEGORIES } from "@/lib/constants/blog";
import { STATUS_SETS } from "@/lib/constants/status";
import { formatDate } from "@/lib/utils/course";
import { blogSchema } from "@/lib/validations/blogValidation";
import { baseSorts, featuredFilter, publishingActions, statusOptions } from "./shared";

const when = (i) => (i.scheduledAt ? `Scheduled ${i.scheduledAt.replace("T", " ")}` : formatDate(i.createdAt));

export const blogConfig = {
  key: "blog",
  collection: "blog",
  singular: "Post",
  plural: "Blog posts",
  base: "/dashboard/blog",
  icon: FileText,
  blurb: "News, study tips and stories from campus.",
  searchHint: "Search by title",
  titleField: "title",
  imageField: "coverImage",
  imageShape: "cover",
  bodyField: "excerpt",
  slugFrom: "title",
  subtitle: (i) => [i.category, i.author && `by ${i.author}`].filter(Boolean).join(" · "),
  featurable: true,
  duplicable: true,
  statuses: STATUS_SETS.publishing,
  defaultStatus: "draft",
  statusActions: publishingActions,
  sorts: {
    ...baseSorts,
    title: { label: "Title A to Z", field: "titleLower", dir: "asc" },
  },
  filters: [{ key: "category", label: "Category", options: BLOG_CATEGORIES }, featuredFilter],
  columns: [
    { key: "category", label: "Category", render: (i) => i.category },
    { key: "author", label: "Author", render: (i) => i.author },
  ],
  meta: (i) => [
    { icon: CalendarClock, text: when(i) },
    i.author && { icon: User, text: i.author },
    i.tags?.length > 0 && { icon: Tag, text: i.tags.slice(0, 2).join(", ") },
  ],
  facts: (i) => [
    { label: "Category", value: i.category },
    { label: "Author", value: i.author },
    { label: "Slug", value: i.slug },
    { label: "Publishing", value: when(i) },
  ],
  detail: (i) => [
    { title: "Excerpt", text: i.excerpt },
    { title: "Content", text: i.content },
    { title: "Tags", tags: i.tags },
    { title: "SEO title", text: i.seoTitle },
    { title: "SEO description", text: i.seoDescription },
  ],
  schema: blogSchema,
  defaults: { title: "", slug: "", excerpt: "", content: "", category: "", tags: "", coverImage: "", author: "", seoTitle: "", seoDescription: "", scheduledAt: "", featured: false, status: "draft" },
  sections: [
    {
      title: "Post",
      description: "The words readers will see.",
      fields: [
        { name: "title", label: "Title", span: 2, placeholder: "e.g. 5 ways to prepare for finals" },
        { name: "slug", label: "Slug", type: "slug", slugFrom: "title", span: 2, placeholder: "auto-generated from the title", description: "Used in the post URL. Leave empty to generate it on save." },
        { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3, span: 2, counter: 200, placeholder: "One or two sentences shown on cards." },
        { name: "content", label: "Content", type: "textarea", rows: 14, span: 2, placeholder: "Write the full post here. Blank lines start a new paragraph." },
      ],
    },
    {
      title: "Details",
      fields: [
        { name: "category", label: "Category", type: "select", options: BLOG_CATEGORIES, placeholder: "Choose category" },
        { name: "author", label: "Author", placeholder: "e.g. Admissions Office" },
        { name: "coverImage", label: "Cover image URL", span: 2, placeholder: "https://…", description: "Optional. A colour cover is used when empty." },
        { name: "tags", label: "Tags", type: "tags", span: 2, placeholder: "exams, tips, productivity", description: "Separate with commas. Up to 8." },
      ],
    },
    {
      title: "SEO",
      description: "What search engines show for this post.",
      fields: [
        { name: "seoTitle", label: "SEO title", span: 2, counter: 60, placeholder: "Defaults to the post title" },
        { name: "seoDescription", label: "SEO description", type: "textarea", rows: 3, span: 2, counter: 160 },
      ],
    },
    {
      title: "Publishing",
      fields: [
        { name: "scheduledAt", label: "Schedule for", type: "datetime-local", description: "Optional. Informational: publish manually or from a scheduled function." },
        { name: "status", label: "Status", type: "select", options: statusOptions(STATUS_SETS.publishing) },
        { name: "featured", label: "Featured post", type: "switch", description: "Pin to the top of the public blog." },
      ],
    },
  ],
};
