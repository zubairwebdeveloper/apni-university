import ResourceFormPage from "@/components/resource/ResourceFormPage";

export default async function Page({ params }) {
  const { careerId } = await params;
  return <ResourceFormPage resource="careers" id={careerId} />;
}
