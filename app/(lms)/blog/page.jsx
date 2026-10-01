import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { posts } from "@/data/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-slate-600">News, study tips and career advice.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden pt-0">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={800}
              className="h-44 w-full object-cover"
            />
            <CardHeader>
              <Badge variant="secondary" className="w-fit">{post.category}</Badge>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">{post.excerpt}</CardContent>
            <CardFooter>
              <Link
                href={`/blog/${post.slug}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Read article
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
