import { CATEGORIES, LEVELS, STATUS_META } from "@/lib/constants/course";

export const courseSections = [
  {
    title: "Basics",
    description: "What students see first.",
    fields: [
      { name: "title", label: "Title", placeholder: "e.g. Next.js from scratch", span: 2 },
      { name: "description", label: "Description", type: "textarea", span: 2, counter: 2000, placeholder: "What will students learn and build?" },
      { name: "category", label: "Category", type: "select", options: CATEGORIES, placeholder: "Choose category" },
      { name: "level", label: "Level", type: "select", options: LEVELS, placeholder: "Choose level" },
    ],
  },
  {
    title: "Pricing and length",
    fields: [
      { name: "price", label: "Price (PKR)", type: "number", description: "Enter 0 for a free course.", inputProps: { min: 0, step: 100 } },
      { name: "duration", label: "Duration (hours)", type: "number", inputProps: { min: 0.5, step: 0.5 } },
    ],
  },
  {
    title: "Presentation",
    fields: [
      { name: "thumbnail", label: "Thumbnail URL", placeholder: "https://…", span: 2, description: "Optional. Without one, a colour cover is generated from the title." },
      { name: "tags", label: "Tags", type: "tags", placeholder: "react, firebase, tailwind", description: "Separate with commas. Up to 8." },
      { name: "status", label: "Status", type: "select", placeholder: "Choose status", options: Object.entries(STATUS_META).map(([value, m]) => ({ value, label: m.label })) },
    ],
  },
];
