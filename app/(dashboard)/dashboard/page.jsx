"use client";

import { useEffect, useMemo, useState } from "react";
import { getApp, getApps } from "firebase/app";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  Flame,
  Heart,
  Laptop2,
  Loader2,
  PlayCircle,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/hooks/useAuth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import "@/lib/firebase/config";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getFirebaseDb() {
  if (!getApps().length) {
    throw new Error(
      "Firebase has not been initialized. Check your Firebase config.",
    );
  }

  return require("firebase/firestore").getFirestore(getApp());
}

function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U"
  );
}

function formatDate(value) {
  if (!value) return "Recently";

  try {
    const date =
      typeof value?.toDate === "function" ? value.toDate() : new Date(value);

    if (Number.isNaN(date.getTime())) return "Recently";

    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return "Recently";
  }
}

function formatRelativeDate(value) {
  if (!value) return "Recently";

  try {
    const date =
      typeof value?.toDate === "function" ? value.toDate() : new Date(value);

    const diff = Date.now() - date.getTime();

    if (Number.isNaN(diff)) return "Recently";

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return formatDate(value);
  } catch {
    return "Recently";
  }
}

function getProgress(item) {
  const progress = Number(item?.progress);

  if (Number.isNaN(progress)) return 0;

  return Math.min(100, Math.max(0, Math.round(progress)));
}

function getActivityIcon(type) {
  switch (type) {
    case "completed":
    case "course_completed":
      return CheckCircle2;

    case "certificate":
    case "certificate_earned":
      return Award;

    case "enrolled":
    case "course_enrolled":
      return BookOpen;

    case "started":
    case "lesson_started":
      return PlayCircle;

    default:
      return Code2;
  }
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-8 w-64 rounded-md bg-muted" />
        <div className="h-4 w-80 rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-4 p-6">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-8 w-16 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <Card className="h-72" />
        <Card className="h-72" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, description }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>

            <p className="text-3xl font-bold tracking-tight">{value}</p>

            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted/50 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Continue Learning                                                          */
/* -------------------------------------------------------------------------- */

function ContinueLearning({ courses }) {
  const activeCourses = courses
    .filter((course) => {
      const progress = getProgress(course);
      return progress > 0 && progress < 100;
    })
    .sort((a, b) => {
      const aDate = a.updatedAt?.seconds || a.lastAccessedAt?.seconds || 0;
      const bDate = b.updatedAt?.seconds || b.lastAccessedAt?.seconds || 0;

      return bDate - aDate;
    })
    .slice(0, 3);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Continue learning</CardTitle>
          <CardDescription>Pick up where you left off.</CardDescription>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/courses">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {activeCourses.length === 0 ? (
          <EmptyState
            title="No course in progress"
            description="Enroll in a technology course and your learning progress will appear here."
          />
        ) : (
          <div className="space-y-5">
            {activeCourses.map((course) => {
              const progress = getProgress(course);

              return (
                <div
                  key={course.id}
                  className="group rounded-xl border p-4 transition-all duration-300 hover:border-primary/40 hover:bg-muted/30"
                >
                  <div className="flex gap-4">
                    <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:flex">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="h-full w-full rounded-xl object-cover"
                        />
                      ) : (
                        <Laptop2 className="h-6 w-6 text-primary" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold leading-tight">
                            {course.courseTitle ||
                              course.title ||
                              "Untitled course"}
                          </h3>

                          {course.category && (
                            <Badge variant="secondary" className="mt-2">
                              {course.category}
                            </Badge>
                          )}
                        </div>

                        <span className="text-sm font-semibold text-primary">
                          {progress}%
                        </span>
                      </div>

                      <Progress value={progress} className="h-2" />

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">
                          {course.lastLesson
                            ? `Last lesson: ${course.lastLesson}`
                            : "Keep building your skills"}
                        </p>

                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={`/dashboard/courses/${course.courseId || course.id}`}
                          >
                            Continue
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Learning Streak                                                            */
/* -------------------------------------------------------------------------- */

function LearningStreak({ activity }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const activeDays = new Set();

  activity.forEach((item) => {
    const rawDate = item.createdAt || item.updatedAt;

    if (!rawDate) return;

    try {
      const date =
        typeof rawDate?.toDate === "function"
          ? rawDate.toDate()
          : new Date(rawDate);

      if (!Number.isNaN(date.getTime())) {
        activeDays.add(date.getDay());
      }
    } catch {
      // Ignore invalid dates.
    }
  });

  const streak = activeDays.size;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Learning streak</CardTitle>
            <CardDescription>
              Stay consistent with your learning.
            </CardDescription>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Flame className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6 flex items-end gap-2">
          <span className="text-4xl font-bold">{streak}</span>
          <span className="pb-1 text-sm text-muted-foreground">
            active days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const jsDay = index === 6 ? 0 : index + 1;
            const active = activeDays.has(jsDay);

            return (
              <div key={`${day}-${index}`} className="space-y-2 text-center">
                <span className="text-xs text-muted-foreground">{day}</span>

                <div
                  className={[
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition-all",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/40 text-muted-foreground",
                  ].join(" ")}
                >
                  {active ? <CheckCircle2 className="h-4 w-4" /> : "·"}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Recent Activity                                                            */
/* -------------------------------------------------------------------------- */

function RecentActivity({ activity }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Your latest learning activity.</CardDescription>
      </CardHeader>

      <CardContent>
        {activity.length === 0 ? (
          <EmptyState
            title="No activity yet"
            description="Once you start learning, your recent activity will appear here."
          />
        ) : (
          <div className="space-y-1">
            {activity.slice(0, 6).map((item, index) => {
              const Icon = getActivityIcon(item.type);

              return (
                <div key={item.id}>
                  <div className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.title || "Learning activity"}
                      </p>

                      {item.description && (
                        <p className="truncate text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatRelativeDate(item.createdAt || item.updatedAt)}
                    </span>
                  </div>

                  {index < Math.min(activity.length, 6) - 1 && (
                    <Separator className="ml-16" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Technology Skills                                                          */
/* -------------------------------------------------------------------------- */

function TechnologySkills({ courses }) {
  const skills = useMemo(() => {
    const map = new Map();

    courses.forEach((course) => {
      const category = course.category;

      if (!category) return;

      const progress = getProgress(course);
      const existing = map.get(category) || {
        total: 0,
        count: 0,
      };

      existing.total += progress;
      existing.count += 1;

      map.set(category, existing);
    });

    return [...map.entries()]
      .map(([name, value]) => ({
        name,
        progress: Math.round(value.total / value.count),
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5);
  }, [courses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technology skills</CardTitle>
        <CardDescription>Your progress by learning category.</CardDescription>
      </CardHeader>

      <CardContent>
        {skills.length === 0 ? (
          <EmptyState
            title="No skill data yet"
            description="Your technology progress will appear after you start a course."
          />
        ) : (
          <div className="space-y-5">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">{skill.name}</span>

                  <span className="text-xs font-semibold text-muted-foreground">
                    {skill.progress}%
                  </span>
                </div>

                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Achievement Card                                                           */
/* -------------------------------------------------------------------------- */

function AchievementCard({ certificates, courses }) {
  const completedCourses = courses.filter(
    (course) => getProgress(course) >= 100,
  ).length;

  const certificateCount = certificates.length;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>
              Milestones from your learning journey.
            </CardDescription>
          </div>

          <Trophy className="h-5 w-5 text-yellow-500" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 rounded-xl border p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600">
            <Trophy className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="font-medium">Courses completed</p>
            <p className="text-sm text-muted-foreground">
              {completedCourses} completed
            </p>
          </div>

          <Badge variant="secondary">{completedCourses}</Badge>
        </div>

        <div className="flex items-center gap-4 rounded-xl border p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Award className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="font-medium">Certificates</p>
            <p className="text-sm text-muted-foreground">
              {certificateCount} earned
            </p>
          </div>

          <Badge variant="secondary">{certificateCount}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Technology Tip                                                             */
/* -------------------------------------------------------------------------- */

function TechnologyTip() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-primary/[0.03]">
      <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:flex">
            <Image
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4bb/512.gif"
              alt="Technology"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-primary">
                Technology learning tip
              </p>
            </div>

            <h3 className="text-lg font-semibold">
              Build projects, not just tutorials.
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              The best way to strengthen your development skills is to turn what
              you learn into real applications.
            </p>
          </div>
        </div>

        <Button variant="outline" asChild className="shrink-0">
          <Link href="/courses">
            Explore courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const { profile, loading: authLoading } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activity, setActivity] = useState([]);

  const [dataLoading, setDataLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState("");

  const uid = profile?.uid || profile?.id;

  useEffect(() => {
    if (!uid) {
      return;
    }

    let mounted = true;

    const listeners = [];

    try {
      const db = getFirebaseDb();

      /* ----------------------------- Enrollments ---------------------------- */

      const enrollmentsRef = collection(db, "users", uid, "enrollments");

      const enrollmentsQuery = query(
        enrollmentsRef,
        orderBy("updatedAt", "desc"),
      );

      listeners.push(
        onSnapshot(
          enrollmentsQuery,
          (snapshot) => {
            if (!mounted) return;

            setEnrollments(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            );

            setDataLoading(false);
          },
          (error) => {
            console.error("Enrollments realtime error:", error);
            if (mounted) setDataLoading(false);
          },
        ),
      );

      /* ----------------------------- Certificates --------------------------- */

      const certificatesRef = collection(db, "users", uid, "certificates");

      const certificatesQuery = query(
        certificatesRef,
        orderBy("issuedAt", "desc"),
      );

      listeners.push(
        onSnapshot(
          certificatesQuery,
          (snapshot) => {
            if (!mounted) return;

            setCertificates(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
          },
          (error) => {
            console.error("Certificates realtime error:", error);
          },
        ),
      );

      /* ------------------------------- Wishlist ----------------------------- */

      const wishlistRef = collection(db, "users", uid, "wishlist");

      const wishlistQuery = query(wishlistRef, orderBy("addedAt", "desc"));

      listeners.push(
        onSnapshot(
          wishlistQuery,
          (snapshot) => {
            if (!mounted) return;

            setWishlist(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
          },
          (error) => {
            console.error("Wishlist realtime error:", error);
          },
        ),
      );

      /* ------------------------------- Activity ------------------------------ */

      const activityRef = collection(db, "users", uid, "activity");

      const activityQuery = query(
        activityRef,
        orderBy("createdAt", "desc"),
        limit(20),
      );

      listeners.push(
        onSnapshot(
          activityQuery,
          (snapshot) => {
            if (!mounted) return;

            setActivity(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
          },
          (error) => {
            console.error("Activity realtime error:", error);
          },
        ),
      );
    } catch (error) {
      console.error("Dashboard Firebase error:", error);

      if (mounted) {
        queueMicrotask(() => {
          if (!mounted) return;

          setFirebaseError("Unable to load your dashboard data right now.");
          setDataLoading(false);
        });
      }
    }

    return () => {
      mounted = false;

      listeners.forEach((unsubscribe) => {
        try {
          unsubscribe();
        } catch {
          // Ignore unsubscribe errors.
        }
      });
    };
  }, [uid]);

  /* ------------------------------------------------------------------------ */
  /* Calculated Stats                                                         */
  /* ------------------------------------------------------------------------ */

  const averageProgress = useMemo(() => {
    if (!enrollments.length) return 0;

    const total = enrollments.reduce(
      (sum, course) => sum + getProgress(course),
      0,
    );

    return Math.round(total / enrollments.length);
  }, [enrollments]);

  const completedCourses = useMemo(
    () => enrollments.filter((course) => getProgress(course) >= 100).length,
    [enrollments],
  );

  const firstName =
    profile?.name?.split(" ")?.[0] ||
    profile?.displayName?.split(" ")?.[0] ||
    "Student";

  if (authLoading || (uid && dataLoading)) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-10">
      {/* -------------------------------------------------------------------- */}
      {/* Header                                                               */}
      {/* -------------------------------------------------------------------- */}

      <PageHeader
        title={`Welcome back, ${firstName} 👋`}
        description="Track your learning, explore technology and keep building your skills."
      />

      {/* -------------------------------------------------------------------- */}
      {/* Profile / Motivation Banner                                         */}
      {/* -------------------------------------------------------------------- */}

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2">
                <AvatarImage
                  src={profile?.avatar || profile?.photoURL || ""}
                  alt={firstName}
                />

                <AvatarFallback>
                  {getInitials(
                    profile?.name || profile?.displayName || "Student",
                  )}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">
                    {profile?.name || profile?.displayName || "Student"}
                  </h2>

                  <Badge variant="secondary">
                    {profile?.role || "student"}
                  </Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {profile?.email ||
                    "Keep learning and building real-world projects."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs text-muted-foreground">
                  Overall progress
                </p>
                <p className="text-xl font-bold">{averageProgress}%</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Rocket className="h-5 w-5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* -------------------------------------------------------------------- */}
      {/* Firebase Error                                                       */}
      {/* -------------------------------------------------------------------- */}

      {firebaseError && (
        <Card className="border-destructive/30">
          <CardContent className="flex items-center gap-3 p-4 text-sm text-destructive">
            <Loader2 className="h-4 w-4" />
            {firebaseError}
          </CardContent>
        </Card>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* Stats                                                                */}
      {/* -------------------------------------------------------------------- */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Enrolled courses"
          value={enrollments.length}
          icon={BookOpen}
          description={`${completedCourses} completed`}
        />

        <StatCard
          label="Certificates earned"
          value={certificates.length}
          icon={Award}
          description="Keep collecting milestones"
        />

        <StatCard
          label="Average progress"
          value={`${averageProgress}%`}
          icon={TrendingUp}
          description="Across your enrolled courses"
        />

        <StatCard
          label="Wishlist items"
          value={wishlist.length}
          icon={Heart}
          description="Courses saved for later"
        />
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Main Learning Area                                                   */}
      {/* -------------------------------------------------------------------- */}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
        <ContinueLearning courses={enrollments} />

        <LearningStreak activity={activity} />
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Activity + Skills                                                    */}
      {/* -------------------------------------------------------------------- */}

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity activity={activity} />

        <TechnologySkills courses={enrollments} />
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Achievements                                                         */}
      {/* -------------------------------------------------------------------- */}

      <div className="grid gap-6 lg:grid-cols-2">
        <AchievementCard certificates={certificates} courses={enrollments} />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Learning goals</CardTitle>
                <CardDescription>
                  Keep moving toward your development goals.
                </CardDescription>
              </div>

              <Target className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Course completion</span>

                <span className="text-xs text-muted-foreground">
                  {completedCourses}/{enrollments.length || 0}
                </span>
              </div>

              <Progress
                value={
                  enrollments.length
                    ? (completedCourses / enrollments.length) * 100
                    : 0
                }
                className="h-2"
              />
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium">Keep your momentum</p>
                <p className="text-sm text-muted-foreground">
                  Consistency matters more than studying once in a while.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium">Learn by building</p>
                <p className="text-sm text-muted-foreground">
                  Turn every concept into a real project.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Technology Tip                                                       */}
      {/* -------------------------------------------------------------------- */}

      <TechnologyTip />
    </div>
  );
}
