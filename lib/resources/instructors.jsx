import { Briefcase, GraduationCap, Mail } from "lucide-react";
import { CATEGORIES } from "@/lib/constants/course";
import { STATUS_SETS } from "@/lib/constants/status";
import { instructorSchema } from "@/lib/validations/instructorValidation";
import { baseSorts, featuredFilter, publishingActions, statusOptions } from "./shared";

export const instructorsConfig = {
  key: "instructors",
  collection: "instructors",
  singular: "Instructor",
  plural: "Instructors",
  base: "/dashboard/instructors",
  icon: GraduationCap,
  blurb: "The people who teach your programs.",
  searchHint: "Search by name",
  titleField: "name",
  imageField: "avatar",
  imageShape: "avatar",
  bodyField: "bio",
  subtitle: (i) => i.headline,
  featurable: true,
  duplicable: true,
  statuses: STATUS_SETS.publishing,
  defaultStatus: "draft",
  statusActions: publishingActions,
  sorts: {
    ...baseSorts,
    name: { label: "Name A to Z", field: "titleLower", dir: "asc" },
    experience: { label: "Most experienced", field: "experience", dir: "desc" },
  },
  filters: [{ key: "specialty", label: "Specialty", options: CATEGORIES }, featuredFilter],
  columns: [
    { key: "specialty", label: "Specialty", render: (i) => i.specialty },
    { key: "experience", label: "Experience", render: (i) => `${i.experience ?? 0} yrs` },
  ],
  meta: (i) => [
    { icon: Briefcase, text: `${i.experience ?? 0} yrs experience` },
    i.specialty && { icon: GraduationCap, text: i.specialty },
    i.email && { icon: Mail, text: i.email },
  ],
  facts: (i) => [
    { label: "Specialty", value: i.specialty },
    { label: "Experience", value: `${i.experience ?? 0} years` },
    { label: "Email", value: i.email },
    { label: "LinkedIn", value: i.linkedin && <a href={i.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-2">Open profile</a> },
  ],
  detail: (i) => [
    { title: "About", text: i.bio },
    { title: "Expertise", tags: i.tags },
  ],
  schema: instructorSchema,
  defaults: { name: "", headline: "", specialty: "", bio: "", experience: 0, email: "", avatar: "", linkedin: "", tags: "", featured: false, status: "draft" },
  sections: [
    {
      title: "Profile",
      description: "How this instructor appears to students.",
      fields: [
        { name: "name", label: "Full name", placeholder: "e.g. Ayesha Khan" },
        { name: "headline", label: "Headline", placeholder: "e.g. Senior React Instructor" },
        { name: "specialty", label: "Specialty", type: "select", options: CATEGORIES, placeholder: "Choose specialty" },
        { name: "experience", label: "Years of experience", type: "number", inputProps: { min: 0, max: 60 } },
        { name: "bio", label: "Bio", type: "textarea", span: 2, counter: 1500, placeholder: "Background, teaching style and achievements…" },
      ],
    },
    {
      title: "Contact and links",
      fields: [
        { name: "email", label: "Email", type: "email", placeholder: "name@university.edu" },
        { name: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/…" },
        { name: "avatar", label: "Photo URL", span: 2, placeholder: "https://…", description: "Optional. Initials are shown when empty." },
        { name: "tags", label: "Expertise tags", type: "tags", span: 2, placeholder: "react, node, system design", description: "Separate with commas. Up to 8." },
      ],
    },
    {
      title: "Visibility",
      fields: [
        { name: "featured", label: "Featured instructor", type: "switch", description: "Highlight on the public instructors page." },
        { name: "status", label: "Status", type: "select", options: statusOptions(STATUS_SETS.publishing) },
      ],
    },
  ],
};
