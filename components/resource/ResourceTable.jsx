"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils/course";
import RowActions from "./RowActions";
import StatusBadge from "./StatusBadge";
import Thumb from "./Thumb";

export default function ResourceTable({ config, items, selected, onSelect, onSelectAll, actions }) {
  const all = items.length > 0 && selected.length === items.length;
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"><Checkbox checked={all} onCheckedChange={onSelectAll} aria-label="Select all" /></TableHead>
            <TableHead>{config.singular}</TableHead>
            {config.columns.map((c) => <TableHead key={c.key}>{c.label}</TableHead>)}
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const title = item[config.titleField];
            return (
              <TableRow key={item.id} data-state={selected.includes(item.id) ? "selected" : undefined}>
                <TableCell><Checkbox checked={selected.includes(item.id)} onCheckedChange={() => onSelect(item.id)} aria-label={`Select ${title}`} /></TableCell>
                <TableCell>
                  <Link href={`${config.base}/${item.id}`} className="flex items-center gap-3">
                    <Thumb title={title} image={config.imageField ? item[config.imageField] : ""} round={config.imageShape === "avatar"} />
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 font-medium hover:underline">
                        <span className="truncate">{title}</span>
                        {item.featured && <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{config.subtitle?.(item)}</span>
                    </span>
                  </Link>
                </TableCell>
                {config.columns.map((c) => <TableCell key={c.key}>{c.render(item)}</TableCell>)}
                <TableCell><StatusBadge config={config} status={item.status} /></TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                <TableCell><RowActions config={config} item={item} {...actions} /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
