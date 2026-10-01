"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { opt } from "@/lib/resources/shared";
import { slugify } from "@/lib/utils/text";
import StarRating from "./StarRating";

function FieldRenderer({ def, control, setValue, getValues }) {
  return (
    <Controller
      name={def.name}
      control={control}
      render={({ field, fieldState }) => {
        const invalid = fieldState.invalid;
        const id = field.name;
        const common = { id, "aria-invalid": invalid, placeholder: def.placeholder };
        const span = def.span === 2 ? "sm:col-span-2" : "";
        let input;

        switch (def.type) {
          case "switch":
            return (
              <Field orientation="horizontal" data-invalid={invalid} className={`rounded-lg border p-4 sm:col-span-2`}>
                <div className="flex-1 space-y-1">
                  <FieldLabel htmlFor={id}>{def.label}</FieldLabel>
                  {def.description && <FieldDescription>{def.description}</FieldDescription>}
                </div>
                <Switch id={id} checked={!!field.value} onCheckedChange={field.onChange} />
              </Field>
            );
          case "textarea":
            input = <Textarea {...field} {...common} rows={def.rows ?? 5} />;
            break;
          case "select":
            input = (
              <Select name={field.name} value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id={id} className="w-full" aria-invalid={invalid}><SelectValue placeholder={def.placeholder ?? "Select…"} /></SelectTrigger>
                <SelectContent>{opt(def.options).map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
            );
            break;
          case "rating":
            input = <StarRating id={id} value={Number(field.value) || 0} onChange={field.onChange} size="size-8" />;
            break;
          case "slug":
            input = (
              <div className="flex gap-2">
                <Input {...field} {...common} />
                <Button type="button" variant="outline" onClick={() => setValue(def.name, slugify(getValues(def.slugFrom) ?? ""), { shouldDirty: true, shouldValidate: true })}>
                  <Sparkles className="size-4" /> Generate
                </Button>
              </div>
            );
            break;
          default:
            input = <Input {...field} {...common} type={def.type ?? "text"} {...def.inputProps} />;
        }

        const len = typeof field.value === "string" ? field.value.length : 0;
        return (
          <Field data-invalid={invalid} className={span}>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor={id}>{def.label}</FieldLabel>
              {def.counter && <span className={`text-xs tabular-nums ${len > def.counter ? "text-destructive" : "text-muted-foreground"}`}>{len}/{def.counter}</span>}
            </div>
            {input}
            {def.description && <FieldDescription>{def.description}</FieldDescription>}
            {invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

export default function ResourceForm({ sections, schema, defaultValues, onSubmit, submitLabel = "Save", mode = "create" }) {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [saved, setSaved] = useState(false);
  const { control, handleSubmit, setValue, getValues, formState: { isSubmitting, isDirty, errors, submitCount } } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const errorCount = Object.keys(errors).length;

  // warn before leaving the tab with unsaved changes
  useEffect(() => {
    if (!isDirty || saved) return;
    const h = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [isDirty, saved]);

  const submit = async (values) => {
    setServerError(null);
    try {
      await onSubmit(values);
      setSaved(true);
    } catch (e) {
      setServerError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 pb-4" noValidate>
      {serverError && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Couldn't save</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}
      {submitCount > 0 && errorCount > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>{errorCount} {errorCount === 1 ? "field needs" : "fields need"} your attention</AlertTitle>
          <AlertDescription>Fix the highlighted fields below and try again.</AlertDescription>
        </Alert>
      )}

      {sections.map((s, i) => (
        <Card key={s.title} className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 [animation-fill-mode:backwards] motion-reduce:animate-none" style={{ animationDelay: `${i * 70}ms` }}>
          <CardHeader>
            <CardTitle>{s.title}</CardTitle>
            {s.description && <CardDescription>{s.description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2">
              {s.fields.map((f) => <FieldRenderer key={f.name} def={f} control={control} setValue={setValue} getValues={getValues} />)}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-3 rounded-xl border bg-background/90 p-3 shadow-lg backdrop-blur">
        <span className="flex items-center gap-2 pl-1 text-sm text-muted-foreground">
          {isDirty && !saved && <><span className="size-2 rounded-full bg-amber-500" /> Unsaved changes</>}
        </span>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting || (mode === "edit" && !isDirty)}>
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {isSubmitting ? "Saving…" : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
