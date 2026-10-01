import {
  addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy,
  query, serverTimestamp, startAfter, updateDoc, where, writeBatch,
} from "firebase/firestore";
import { db } from "./client";

const serialize = (snap) => {
  const d = snap.data();
  return { id: snap.id, ...d, createdAt: d.createdAt?.toMillis?.() ?? null, updatedAt: d.updatedAt?.toMillis?.() ?? null };
};
const chunk = (a, n = 450) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

// One factory = every Firestore operation a module needs (list/search/filter/sort/paginate/CRUD/bulk/stats).
export function createResourceApi(config) {
  const { collection: name, titleField, sorts, filters = [], pageSize = 9 } = config;
  const col = () => collection(db, name);
  const ref = (id) => doc(db, name, id);
  const titleLower = (data) => (data[titleField] ? { titleLower: String(data[titleField]).toLowerCase() } : {});

  function constraints({ filters: f = {}, search = "", sort }) {
    const c = [];
    if (f.status && f.status !== "all") c.push(where("status", "==", f.status));
    for (const def of filters) {
      const v = f[def.key];
      if (!v || v === "all") continue;
      c.push(where(def.field ?? def.key, "==", def.type === "boolean" ? v === "yes" : def.type === "number" ? Number(v) : v));
    }
    const term = search.trim().toLowerCase();
    if (term) {
      c.push(where("titleLower", ">=", term), where("titleLower", "<=", term + "\uf8ff"), orderBy("titleLower", "asc"));
    } else {
      const s = sorts[sort] ?? Object.values(sorts)[0];
      c.push(orderBy(s.field, s.dir));
    }
    return c;
  }

  async function list({ filters: f, search, sort, cursor = null }) {
    const q = query(col(), ...constraints({ filters: f, search, sort }), ...(cursor ? [startAfter(cursor)] : []), limit(pageSize + 1));
    const snap = await getDocs(q);
    const hasNext = snap.docs.length > pageSize;
    const docs = hasNext ? snap.docs.slice(0, pageSize) : snap.docs;
    return { items: docs.map(serialize), lastDoc: docs.at(-1) ?? null, hasNext };
  }

  async function get(id) {
    const s = await getDoc(ref(id));
    return s.exists() ? serialize(s) : null;
  }

  async function create(data) {
    const r = await addDoc(col(), { ...data, ...titleLower(data), createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return r.id;
  }

  const update = (id, data) => updateDoc(ref(id), { ...data, ...titleLower(data), updatedAt: serverTimestamp() });
  const remove = (id) => deleteDoc(ref(id));
  const setStatus = (id, status) => updateDoc(ref(id), { status, updatedAt: serverTimestamp() });
  const setFeatured = (id, featured) => updateDoc(ref(id), { featured, updatedAt: serverTimestamp() });

  async function duplicate(id) {
    const s = await getDoc(ref(id));
    if (!s.exists()) throw { code: "not-found" };
    // eslint-disable-next-line no-unused-vars
    const { createdAt, updatedAt, titleLower: _t, ...rest } = s.data();
    rest[titleField] = `${rest[titleField]} (Copy)`;
    if (rest.slug) rest.slug = `${rest.slug}-copy`;
    return create({ ...rest, status: config.defaultStatus, featured: false });
  }

  async function bulkStatus(ids, status) {
    for (const part of chunk(ids)) {
      const b = writeBatch(db);
      part.forEach((id) => b.update(ref(id), { status, updatedAt: serverTimestamp() }));
      await b.commit();
    }
  }

  async function bulkRemove(ids) {
    for (const part of chunk(ids)) {
      const b = writeBatch(db);
      part.forEach((id) => b.delete(ref(id)));
      await b.commit();
    }
  }

  async function stats() {
    const count = async (s) => (await getCountFromServer(s ? query(col(), where("status", "==", s)) : col())).data().count;
    const keys = Object.keys(config.statuses);
    const counts = await Promise.all([count(), ...keys.map(count)]);
    return Object.fromEntries([["total", counts[0]], ...keys.map((k, i) => [k, counts[i + 1]])]);
  }

  return { list, get, create, update, remove, setStatus, setFeatured, duplicate, bulkStatus, bulkRemove, stats };
}
