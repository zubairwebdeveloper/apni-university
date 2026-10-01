import { COURSE_STATUS } from "@/lib/constants/course";
import { updateCourse } from "./update";

export const publishCourse = (id) => updateCourse(id, { status: COURSE_STATUS.PUBLISHED });
export const unpublishCourse = (id) => updateCourse(id, { status: COURSE_STATUS.DRAFT });
