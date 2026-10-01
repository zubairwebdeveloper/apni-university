import ResourceDetail from "@/components/resource/ResourceDetail";

export default async function Page({ params }) {
  const { instructorId } = await params;
  return <ResourceDetail resource="instructors" id={instructorId} />;
}
