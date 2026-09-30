"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const categories = [
  {
    title: "Web Development",
    courses: "24 Courses",
    icon: "💻",
  },
  {
    title: "AI & Automation",
    courses: "18 Courses",
    icon: "🤖",
  },
  {
    title: "Design",
    courses: "16 Courses",
    icon: "🎨",
  },
  {
    title: "Business",
    courses: "12 Courses",
    icon: "📈",
  },
  {
    title: "Marketing",
    courses: "14 Courses",
    icon: "📣",
  },
  {
    title: "Freelancing",
    courses: "10 Courses",
    icon: "🚀",
  },
];

const courses = [
  {
    title: "Full Stack Web Development",
    description:
      "Learn modern frontend and backend development by building real-world projects.",
    category: "Development",
    level: "Beginner",
    lessons: 86,
    duration: "32h",
    students: "12.4k",
    rating: "4.9",
    price: "$49",
    oldPrice: "$99",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AI & Chatbot Automation",
    description:
      "Build intelligent AI assistants and automate real business workflows.",
    category: "AI & Automation",
    level: "Intermediate",
    lessons: 64,
    duration: "24h",
    students: "8.7k",
    rating: "4.8",
    price: "$59",
    oldPrice: "$119",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Modern UI/UX Design",
    description:
      "Design beautiful, accessible and conversion-focused digital products.",
    category: "Design",
    level: "Beginner",
    lessons: 52,
    duration: "18h",
    students: "6.2k",
    rating: "4.9",
    price: "$39",
    oldPrice: "$79",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Learn by Doing",
    description:
      "Follow practical lessons and build projects instead of only watching lectures.",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description:
      "Complete courses and showcase verified certificates on your professional profile.",
  },
  {
    icon: Users,
    title: "Learn Together",
    description:
      "Join a growing community of learners, creators and professionals.",
  },
  {
    icon: Zap,
    title: "Learn at Your Pace",
    description:
      "Study whenever you want with flexible, self-paced learning experiences.",
  },
];

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Full Stack Developer",
    text: "The practical projects helped me understand concepts much faster than traditional courses.",
    rating: 5,
  },
  {
    name: "Sara Ali",
    role: "UI/UX Designer",
    text: "I loved the structure. Everything feels focused on skills that actually matter in the real world.",
    rating: 5,
  },
  {
    name: "Usman Raza",
    role: "Freelancer",
    text: "The courses gave me the confidence to start taking real client projects.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge
                variant="secondary"
                className="mb-6 rounded-full px-4 py-2"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Learn skills. Build your future.
              </Badge>

              <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Learn skills that{" "}
                <span className="text-primary">move your life forward.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Practical courses taught by experienced instructors. Learn
                technology, AI, design, business and career skills through
                real-world projects.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-7" >
                  <Link href="/courses">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-7"
                  
                >
                  <Link href="/about">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    How It Works
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Lifetime access
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Practical projects
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Certificates
                </div>
              </div>
            </div>

            {/* HERO CARD */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/5 blur-3xl" />

              <Card className="overflow-hidden rounded-3xl border shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                    alt="Students learning together"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <Card className="absolute bottom-5 left-5 right-5 border-white/20 bg-background/90 backdrop-blur-md">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">
                            Students learning today
                          </p>

                          <p className="mt-1 text-2xl font-bold">25,000+</p>
                        </div>

                        <div className="flex -space-x-2">
                          {[
                            "https://i.pravatar.cc/100?img=12",
                            "https://i.pravatar.cc/100?img=32",
                            "https://i.pravatar.cc/100?img=47",
                            "https://i.pravatar.cc/100?img=52",
                          ].map((src, index) => (
                            <img
                              key={index}
                              src={src}
                              alt="Student"
                              className="h-9 w-9 rounded-full border-2 border-background object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="What do you want to learn?"
                className="h-12 rounded-xl pl-12"
              />
            </div>

            <Button size="lg" className="h-12 px-8">
              Search Courses
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 border-x sm:grid-cols-4">
          {[
            ["25K+", "Active Students"],
            ["150+", "Expert Courses"],
            ["50+", "Professional Instructors"],
            ["98%", "Student Satisfaction"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`px-5 py-8 text-center ${
                index !== 3 ? "border-r" : ""
              }`}
            >
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Badge variant="outline">Explore categories</Badge>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Find the skill you want to master.
              </h2>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Choose from practical learning paths designed around real skills
                and real opportunities.
              </p>
            </div>

            <Button variant="ghost" className="w-fit">
              View all categories
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category.title}
                className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                    {category.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.courses}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="border-y bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Badge variant="outline">Featured courses</Badge>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Start learning today.
              </h2>

              <p className="mt-3 text-muted-foreground">
                Popular courses built for practical, career-focused learning.
              </p>
            </div>

            <Button variant="outline">
              View all courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.title}
                className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <Badge className="absolute left-4 top-4">
                    {course.category}
                  </Badge>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge variant="secondary">{course.level}</Badge>

                    <span className="text-xs text-muted-foreground">
                      {course.students} students
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight">
                    {course.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} lessons
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {course.duration}
                    </span>
                  </div>

                  <Separator className="my-5" />

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-2xl font-bold">{course.price}</span>

                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        {course.oldPrice}
                      </span>
                    </div>

                    <Button>
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY APNA UNIVERSITY */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Badge variant="outline">Why apna university?</Badge>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Education should lead to real opportunities.
              </h2>

              <p className="mt-5 leading-7 text-muted-foreground">
                We focus on practical skills that help students become confident
                builders, creators, freelancers and professionals.
              </p>

              <Button className="mt-7" size="lg">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card key={feature.title}>
                    <CardContent className="p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-5 font-semibold">{feature.title}</h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING PROCESS */}
      <section className="border-y bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline">Simple learning process</Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn. Practice. Grow.
            </h2>

            <p className="mt-4 text-muted-foreground">
              A simple path from discovering a skill to building real-world
              confidence.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: Search,
                title: "Choose a course",
                description:
                  "Explore courses and choose a learning path that matches your goals.",
              },
              {
                number: "02",
                icon: GraduationCap,
                title: "Learn & practice",
                description:
                  "Watch lessons, complete exercises and build practical projects.",
              },
              {
                number: "03",
                icon: Award,
                title: "Grow your career",
                description:
                  "Earn certificates and use your new skills for jobs, freelancing or business.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <Card key={step.number} className="relative">
                  <CardContent className="p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-4xl font-bold text-muted-foreground/20">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline">Student stories</Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by learners.
            </h2>

            <p className="mt-3 text-muted-foreground">
              Real learning experiences from our growing community.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ),
                    )}
                  </div>

                  <p className="mt-5 leading-7 text-muted-foreground">
                    “{testimonial.text}”
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR CTA */}
      <section className="border-y bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="secondary">For instructors</Badge>

                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  Have a skill worth teaching?
                </h2>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Share your knowledge, build your audience and create
                  meaningful learning experiences for students.
                </p>
              </div>

              <Button size="lg">
                Become an Instructor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Your next skill could change your future.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Start learning today with practical courses designed to help you
            build skills, confidence and real opportunities.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-8">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline" className="h-12 px-8">
              Create Free Account
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
