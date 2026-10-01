import ResourceFormPage from "@/components/resource/ResourceFormPage";

export default async function Page({ params }) {
  const { instructorId } = await params;
  return <ResourceFormPage resource="instructors" id={instructorId} />;
}
