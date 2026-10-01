import ResourceDetail from "@/components/resource/ResourceDetail";

export default async function Page({ params }) {
  const { reviewId } = await params;
  return <ResourceDetail resource="reviews" id={reviewId} />;
}
