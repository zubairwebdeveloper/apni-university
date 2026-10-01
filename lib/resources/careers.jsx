import { Banknote, CalendarX2, Briefcase, MapPin } from "lucide-react";
import { DEPARTMENTS, EXPERIENCE_LEVELS, JOB_TYPES, WORK_MODES } from "@/lib/constants/career";
import { STATUS_SETS } from "@/lib/constants/status";
import { formatDate } from "@/lib/utils/course";
import { careerSchema } from "@/lib/validations/careerValidation";
import { baseSorts, compact, featuredFilter, publishingActions } from "./shared";

const salary = (i) =>
  i.salaryMin || i.salaryMax
    ? `PKR ${compact(i.salaryMin || 0)}${i.salaryMax ? ` – ${compact(i.salaryMax)}` : "+"}`
    : "Not disclosed";
const deadline = (i) => (i.deadline ? formatDate(new Date(i.deadline).getTime()) : "Open until filled");

// careers reuse the publishing statuses, with friendlier labels
const statuses = {
  draft: { label: "Draft", tone: "amber" },
  published: { label: "Open", tone: "emerald" },
  archived: { label: "Closed", tone: "slate" },
};

export const careersConfig = {
  key: "careers",
  collection: "careers",
  singular: "Job",
  plural: "Careers",
  base: "/dashboard/careers",
  icon: Briefcase,
  blurb: "Open positions at your institution.",
  searchHint: "Search by job title",
  titleField: "title",
  bodyField: "description",
  imageShape: "none",
  subtitle: (i) => [i.department, i.type].filter(Boolean).join(" · "),
  featurable: true,
  duplicable: true,
  statuses,
  defaultStatus: "draft",
  statusActions: publishingActions.map((a) => ({ ...a, label: a.status === "published" ? "Open position" : a.status === "archived" ? "Close position" : a.label })),
  sorts: {
    ...baseSorts,
    deadline: { label: "Deadline soonest", field: "deadline", dir: "asc" },
    salary: { label: "Highest salary", field: "salaryMax", dir: "desc" },
  },
  filters: [
    { key: "department", label: "Department", options: DEPARTMENTS },
    { key: "type", label: "Type", options: JOB_TYPES },
    featuredFilter,
  ],
  columns: [
    { key: "department", label: "Department", render: (i) => i.department },
    { key: "type", label: "Type", render: (i) => i.type },
    { key: "deadline", label: "Deadline", render: (i) => deadline(i) },
  ],
  meta: (i) => [
    { icon: MapPin, text: `${i.location} · ${i.workMode}` },
    { icon: Banknote, text: salary(i) },
    { icon: CalendarX2, text: deadline(i) },
  ],
  facts: (i) => [
    { label: "Location", value: `${i.location} (${i.workMode})` },
    { label: "Experience", value: i.experience },
    { label: "Salary", value: salary(i) },
    { label: "Apply by", value: deadline(i) },
  ],
  detail: (i) => [
    { title: "About the role", text: i.description },
    { title: "Requirements", list: (i.requirements ?? "").split("\n").map((l) => l.trim()).filter(Boolean) },
    { title: "Apply at", text: i.applyEmail },
  ],
  schema: careerSchema,
  defaults: { title: "", department: "", type: "", workMode: "", location: "", experience: "", salaryMin: 0, salaryMax: 0, deadline: "", description: "", requirements: "", applyEmail: "", featured: false, status: "draft" },
  sections: [
    {
      title: "Role",
      description: "What the job is and where it sits.",
      fields: [
        { name: "title", label: "Job title", span: 2, placeholder: "e.g. Lecturer, Computer Science" },
        { name: "department", label: "Department", type: "select", options: DEPARTMENTS, placeholder: "Choose department" },
        { name: "type", label: "Job type", type: "select", options: JOB_TYPES, placeholder: "Choose type" },
        { name: "workMode", label: "Work mode", type: "select", options: WORK_MODES, placeholder: "Choose mode" },
        { name: "location", label: "Location", placeholder: "e.g. Islamabad" },
        { name: "experience", label: "Experience", type: "select", options: EXPERIENCE_LEVELS, placeholder: "Choose level" },
      ],
    },
    {
      title: "Description",
      fields: [
        { name: "description", label: "About the role", type: "textarea", rows: 6, span: 2, counter: 3000, placeholder: "Responsibilities, team and what success looks like." },
        { name: "requirements", label: "Requirements", type: "textarea", rows: 5, span: 2, description: "One requirement per line.", placeholder: "MS in Computer Science\n2+ years of teaching experience" },
      ],
    },
    {
      title: "Compensation and applications",
      fields: [
        { name: "salaryMin", label: "Minimum salary (PKR / month)", type: "number", inputProps: { min: 0, step: 5000 }, description: "Use 0 to hide the salary." },
        { name: "salaryMax", label: "Maximum salary (PKR / month)", type: "number", inputProps: { min: 0, step: 5000 } },
        { name: "deadline", label: "Application deadline", type: "date" },
        { name: "applyEmail", label: "Apply email", type: "email", placeholder: "careers@university.edu" },
      ],
    },
    {
      title: "Visibility",
      fields: [
        { name: "featured", label: "Featured job", type: "switch", description: "Pin to the top of the careers page." },
        { name: "status", label: "Status", type: "select", options: Object.entries(statuses).map(([value, m]) => ({ value, label: m.label })) },
      ],
    },
  ],
};
