import ResourceDetail from "@/components/resource/ResourceDetail";

export default async function Page({ params }) {
  const { postId } = await params;
  return <ResourceDetail resource="blog" id={postId} />;
}
