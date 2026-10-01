"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/constants/course";
import { formatPrice, gradientFor } from "@/lib/utils/course";

export default function PublicCourseCard({ course, index = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: (index % PAGE_SIZE) * 0.04 }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="h-full"
    >
      <Link href={`/courses/${course.id}`} className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2A4A]">
        <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow group-hover:shadow-lg">
          <div className="relative aspect-video overflow-hidden">
            {course.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={course.thumbnail} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="size-full transition-transform duration-500 group-hover:scale-105" style={{ background: gradientFor(course.title) }} />
            )}
            <Badge className="absolute left-3 top-3 bg-white/90 text-slate-900 backdrop-blur hover:bg-white/90">{course.category}</Badge>
            {course.price === 0 && <Badge className="absolute right-3 top-3 bg-emerald-600 text-white">Free</Badge>}
          </div>

          <CardContent className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900">{course.title}</h3>
              <p className="mt-1 text-xs font-medium text-slate-500">{course.level}</p>
            </div>
            <p className="line-clamp-2 text-sm text-slate-600">{course.description}</p>

            <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm">
              <span className="flex items-center gap-3 text-slate-500">
                <span className="flex items-center gap-1"><Clock className="size-3.5" />{course.duration}h</span>
                <span className="flex items-center gap-1"><Users className="size-3.5" />{course.students ?? 0}</span>
              </span>
              <span className="font-semibold tabular-nums text-[#0F2A4A]">{formatPrice(course.price)}</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-[#0F2A4A]">
              View details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function CardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Skeleton className="aspect-video w-full rounded-none" />
      <CardContent className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}
