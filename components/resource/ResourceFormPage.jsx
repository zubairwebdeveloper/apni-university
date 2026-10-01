"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { resources } from "@/lib/resources";
import { toFormValues } from "@/lib/services/base";
import ResourceForm from "./ResourceForm";

// Create when `id` is missing, edit when it's given.
export default function ResourceFormPage({ resource, id }) {
  const router = useRouter();
  const { config, service } = resources[resource];
  const editing = Boolean(id);
  const [item, setItem] = useState(editing ? undefined : null); // undefined = loading, false = not found
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!editing) return;
    service.get(id).then((i) => setItem(i ?? false)).catch(setError);
  }, [editing, id, service]);

  const onSubmit = async (values) => {
    if (editing) {
      await service.update(id, values);
      toast.success(`${config.singular} updated`);
      router.push(`${config.base}/${id}`);
    } else {
      await service.create(values);
      toast.success(`${config.singular} created`);
      router.push(config.base);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
      <Link href={config.base} className={buttonVariants({ variant: "ghost", size: "sm" })}><ArrowLeft className="size-4" /> All {config.plural.toLowerCase()}</Link>
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{editing ? `Edit ${config.singular.toLowerCase()}` : `New ${config.singular.toLowerCase()}`}</h1>
        <p className="text-sm text-muted-foreground">{editing ? "Update the details and save." : "Saved as a draft unless you change the status."}</p>
      </header>

      {error ? (
        <Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Couldn't load</AlertTitle><AlertDescription>{error.message}</AlertDescription></Alert>
      ) : item === undefined ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>
      ) : item === false ? (
        <Alert><AlertCircle className="size-4" /><AlertTitle>Not found</AlertTitle><AlertDescription>This {config.singular.toLowerCase()} may have been deleted.</AlertDescription></Alert>
      ) : (
        <ResourceForm
          sections={config.sections}
          schema={config.schema}
          defaultValues={editing ? toFormValues(config, item) : config.defaults}
          onSubmit={onSubmit}
          submitLabel={editing ? "Save changes" : `Create ${config.singular.toLowerCase()}`}
          mode={editing ? "edit" : "create"}
        />
      )}
    </div>
  );
}
