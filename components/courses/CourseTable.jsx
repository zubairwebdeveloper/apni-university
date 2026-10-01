"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatPrice, gradientFor } from "@/lib/utils/course";
import CourseActions from "./CourseActions";
import CourseStatusBadge from "./CourseStatusBadge";

export default function CourseTable({ courses, selected, onSelect, onSelectAll, ...actions }) {
  const all = courses.length > 0 && selected.length === courses.length;
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"><Checkbox checked={all} onCheckedChange={onSelectAll} aria-label="Select all" /></TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Students</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((c) => (
            <TableRow key={c.id} data-state={selected.includes(c.id) ? "selected" : undefined}>
              <TableCell><Checkbox checked={selected.includes(c.id)} onCheckedChange={() => onSelect(c.id)} aria-label={`Select ${c.title}`} /></TableCell>
              <TableCell>
                <Link href={`/dashboard/courses/${c.id}`} className="flex items-center gap-3">
                  <span className="size-10 shrink-0 rounded-md bg-cover bg-center"
                    style={{ background: c.thumbnail ? `url(${c.thumbnail}) center/cover` : gradientFor(c.title) }} />
                  <span>
                    <span className="block font-medium hover:underline">{c.title}</span>
                    <span className="block text-xs text-muted-foreground">{c.category}</span>
                  </span>
                </Link>
              </TableCell>
              <TableCell><CourseStatusBadge status={c.status} /></TableCell>
              <TableCell>{c.level}</TableCell>
              <TableCell className="text-right tabular-nums">{formatPrice(c.price)}</TableCell>
              <TableCell className="text-right tabular-nums">{c.students ?? 0}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(c.createdAt)}</TableCell>
              <TableCell><CourseActions course={c} {...actions} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
