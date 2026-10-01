import { createResourceApi } from "../firebase/resource";
import { tagsToArray } from "../utils/course";
import { slugify } from "../utils/text";

const MESSAGES = {
  "permission-denied": "You don't have permission to do that.",
  unavailable: "Can't reach the server. Check your connection and try again.",
  "failed-precondition": "This query needs a Firestore index. Open the browser console and click the link Firebase printed.",
  "not-found": "This item no longer exists.",
  unauthenticated: "Your session expired. Sign in again.",
};

export class ServiceError extends Error {
  constructor(e) {
    super(MESSAGES[e?.code?.replace("firestore/", "")] ?? e?.message ?? "Something went wrong.");
    this.code = e?.code;
  }
}

const safe = (fn) => async (...args) => {
  try { return await fn(...args); } catch (e) { console.error(e); throw new ServiceError(e); }
};

const formFields = (config) => config.sections.flatMap((s) => s.fields);

// form values -> Firestore document
export function toPayload(config, values) {
  const out = { ...values };
  for (const f of formFields(config)) if (f.type === "tags") out[f.name] = tagsToArray(values[f.name]);
  if (config.slugFrom && !out.slug) out.slug = slugify(out[config.slugFrom] ?? "");
  return Object.fromEntries(Object.entries(out).filter(([, v]) => v !== undefined));
}

// Firestore document -> form values (only keys the form knows about)
export function toFormValues(config, item) {
  return Object.fromEntries(
    Object.entries(config.defaults).map(([k, d]) => {
      const v = item?.[k];
      if (v === undefined || v === null) return [k, d];
      return [k, Array.isArray(v) ? v.join(", ") : v];
    })
  );
}

export function createService(config) {
  const api = createResourceApi(config);
  return {
    list: safe(api.list),
    get: safe(api.get),
    stats: safe(api.stats),
    create: safe((v) => api.create(toPayload(config, v))),
    update: safe((id, v) => api.update(id, toPayload(config, v))),
    remove: safe(api.remove),
    setStatus: safe(api.setStatus),
    setFeatured: safe(api.setFeatured),
    duplicate: safe(api.duplicate),
    bulkStatus: safe(api.bulkStatus),
    bulkRemove: safe(api.bulkRemove),
  };
}
