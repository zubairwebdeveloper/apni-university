import { COURSE_STATUS } from "@/lib/constants/course";
import { tagsToArray } from "@/lib/utils/course";
import { archiveCourse } from "../firebase/courses/archive";
import { bulkDelete, bulkUpdateStatus } from "../firebase/courses/bulk";
import { createCourse } from "../firebase/courses/create";
import { deleteCourse } from "../firebase/courses/delete";
import { publishCourse, unpublishCourse } from "../firebase/courses/publish";
import { getCourseById, getCourses, getCourseStats } from "../firebase/courses/read";
import { searchCourses } from "../firebase/courses/search";
import { updateCourse } from "../firebase/courses/update";

const MESSAGES = {
  "permission-denied": "You don't have permission to do that.",
  unavailable: "Can't reach the server. Check your connection and try again.",
  "failed-precondition": "This query needs a Firestore index. Open the browser console and click the link Firebase printed.",
  "not-found": "This course no longer exists.",
  unauthenticated: "Your session expired. Sign in again.",
};

export class CourseServiceError extends Error {
  constructor(error) {
    super(MESSAGES[error?.code?.replace("firestore/", "")] ?? error?.message ?? "Something went wrong.");
    this.code = error?.code;
  }
}

// Wrap every call so the UI only ever sees a friendly CourseServiceError.
const safe = (fn) => async (...args) => {
  try { return await fn(...args); } catch (e) { console.error(e); throw new CourseServiceError(e); }
};

const toPayload = (v) => ({ ...v, tags: tagsToArray(v.tags), thumbnail: v.thumbnail || "" });

export const courseService = {
  list: safe(({ filters, search, cursor }) =>
    search?.trim() ? searchCourses(search, filters, { cursor }) : getCourses(filters, { cursor })),
  get: safe(getCourseById),
  stats: safe(getCourseStats),
  create: safe((values) => createCourse(toPayload(values))),
  update: safe((id, values) => updateCourse(id, toPayload(values))),
  remove: safe(deleteCourse),
  publish: safe(publishCourse),
  unpublish: safe(unpublishCourse),
  archive: safe(archiveCourse),
  bulkPublish: safe((ids) => bulkUpdateStatus(ids, COURSE_STATUS.PUBLISHED)),
  bulkArchive: safe((ids) => bulkUpdateStatus(ids, COURSE_STATUS.ARCHIVED)),
  bulkDelete: safe(bulkDelete),
};
