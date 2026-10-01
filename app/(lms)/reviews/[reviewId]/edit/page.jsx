import ResourceFormPage from "@/components/resource/ResourceFormPage";

export default async function Page({ params }) {
  const { reviewId } = await params;
  return <ResourceFormPage resource="reviews" id={reviewId} />;
}
