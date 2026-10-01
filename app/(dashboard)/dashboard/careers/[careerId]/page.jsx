import ResourceDetail from "@/components/resource/ResourceDetail";

export default async function Page({ params }) {
  const { careerId } = await params;
  return <ResourceDetail resource="careers" id={careerId} />;
}
