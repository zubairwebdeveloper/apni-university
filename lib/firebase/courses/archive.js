import { COURSE_STATUS } from "@/lib/constants/course";
import { updateCourse } from "./update";

export const archiveCourse = (id) => updateCourse(id, { status: COURSE_STATUS.ARCHIVED });
