export const REVIEW_STATUSES = ["pending", "approved", "rejected", "hidden"];
export const RATING_OPTIONS = [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} ${n === 1 ? "star" : "stars"}` }));
