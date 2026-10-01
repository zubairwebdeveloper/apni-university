import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post ? post.title : "Article not found" };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Badge variant="secondary">{post.category}</Badge>
      <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{post.date}</p>
      <Image src={post.image} alt={post.title} width={1200} height={800} className="mt-6 rounded-xl" />
      <div className="mt-6 space-y-4 text-slate-700">
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
      <Link href="/blog" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
        Back to blog
      </Link>
    </article>
  );
}
