"use client";

import { useRouter } from "next/navigation";
import { Copy, Eye, MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RowActions({ config, item, onStatus, onFeature, onDuplicate, onDelete }) {
  const router = useRouter();
  const title = item[config.titleField];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`Actions for ${title}`}>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push(`${config.base}/${item.id}`)}><Eye className="size-4" /> View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`${config.base}/${item.id}/edit`)}><Pencil className="size-4" /> Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        {config.statusActions.filter((a) => a.status !== item.status).map((a) => (
          <DropdownMenuItem key={a.status} onClick={() => onStatus(item.id, a.status)}>
            <a.icon className="size-4" /> {a.label}
          </DropdownMenuItem>
        ))}
        {config.featurable && (
          <DropdownMenuItem onClick={() => onFeature(item)}>
            <Star className="size-4" /> {item.featured ? "Remove from featured" : "Mark as featured"}
          </DropdownMenuItem>
        )}
        {config.duplicable && (
          <DropdownMenuItem onClick={() => onDuplicate(item.id)}><Copy className="size-4" /> Duplicate</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete([item.id])}>
          <Trash2 className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
