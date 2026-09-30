"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/profileValidation";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/lib/services/profileService";
import { notificationService } from "@/lib/services/notificationService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ProfileForm() {
  const { user, profile, refreshUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
      phone: profile?.phone || "",
      bio: profile?.bio || "",
      website: profile?.website || "",
      location: profile?.location || "",
      socialLinks: profile?.socialLinks || { github: "", linkedin: "", twitter: "", instagram: "" },
    },
  });

  async function onSubmit(values) {
    setSubmitting(true);
    try {
      const taken = await profileService.isUsernameTaken(values.username, user.uid);
      if (taken) {
        notificationService.error("That username is already taken.");
        return;
      }
      await profileService.updateProfile(user.uid, values);
      await refreshUser();
      notificationService.success("Profile updated");
    } catch (error) {
      notificationService.error(error.message || "Could not update profile");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...register("username")} />
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" placeholder="https://" {...register("website")} />
        {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={4} {...register("bio")} />
        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input id="github" {...register("socialLinks.github")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" {...register("socialLinks.linkedin")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter / X</Label>
          <Input id="twitter" {...register("socialLinks.twitter")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" {...register("socialLinks.instagram")} />
        </div>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
