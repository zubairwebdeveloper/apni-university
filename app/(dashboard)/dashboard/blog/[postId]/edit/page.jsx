import ResourceFormPage from "@/components/resource/ResourceFormPage";

export default async function Page({ params }) {
  const { postId } = await params;
  return <ResourceFormPage resource="blog" id={postId} />;
}
