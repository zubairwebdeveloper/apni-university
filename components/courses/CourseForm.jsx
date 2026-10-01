"use client";

import ResourceForm from "@/components/resource/ResourceForm";
import { courseSections } from "@/lib/resources/courseSections";
import { courseDefaults, courseSchema } from "@/lib/validations/courseValidation";

// Same Card + Field form engine as every other module.
export default function CourseForm({ defaultValues, onSubmit, submitLabel = "Save course" }) {
  return (
    <ResourceForm
      sections={courseSections}
      schema={courseSchema}
      defaultValues={{ ...courseDefaults, ...defaultValues }}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      mode={defaultValues ? "edit" : "create"}
    />
  );
}
