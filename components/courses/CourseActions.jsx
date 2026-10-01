"use client";

import { useRouter } from "next/navigation";
import { Archive, Eye, EyeOff, MoreHorizontal, Pencil, Rocket, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const base = "/dashboard/courses";

export default function CourseActions({ course, onPublish, onUnpublish, onArchive, onDelete }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`Actions for ${course.title}`}>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => router.push(`${base}/${course.id}`)}><Eye className="size-4" /> View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`${base}/${course.id}/edit`)}><Pencil className="size-4" /> Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        {course.status === "published" ? (
          <DropdownMenuItem onClick={() => onUnpublish(course.id)}><EyeOff className="size-4" /> Unpublish</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onPublish(course.id)}><Rocket className="size-4" /> Publish</DropdownMenuItem>
        )}
        {course.status !== "archived" && (
          <DropdownMenuItem onClick={() => onArchive(course.id)}><Archive className="size-4" /> Archive</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete([course.id])}>
          <Trash2 className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
