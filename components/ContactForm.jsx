"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Err = ({ e }) =>
  e ? (
    <p role="alert" className="text-sm text-red-600">
      {e.message}
    </p>
  ) : null;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data) => {
    // Replace this with a real API call, e.g. fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          aria-invalid={!!errors.name}
          {...register("name", {
            required: "Please enter your name.",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters.",
            },
          })}
        />
        <Err e={errors.name} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          {...register("email", {
            required: "Please enter your email.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          })}
        />
        <Err e={errors.email} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          aria-invalid={!!errors.phone}
          {...register("phone", {
            required: "Please enter your phone number.",
            pattern: {
              value: /^[0-9+\-\s]{10,15}$/,
              message: "Enter 10 to 15 digits.",
            },
          })}
        />
        <Err e={errors.phone} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message", {
            required: "Please write a message.",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters.",
            },
          })}
        />
        <Err e={errors.message} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-[#0F2A4A]">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
      {isSubmitSuccessful && (
        <p className="text-sm text-green-700">
          Thank you. We will reply within 2 working days.
        </p>
      )}
    </form>
  );
}
