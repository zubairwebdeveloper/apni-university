"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Camera, Trash2, Check, X, Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import {
  updateProfileInfo,
  updateAvatar,
  removeAvatar,
  isUsernameTaken,
} from "@/lib/services/userService";
import { notificationService } from "@/lib/services/notificationService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const MAX_IMAGE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

const sanitizeUsername = (v) =>
  (v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .slice(0, 20);

const toFormValues = (profile, user) => ({
  fullName: profile?.fullName || profile?.name || user?.displayName || "",
  username: sanitizeUsername(profile?.username),
});

/**
 * Props:
 *  - open: boolean
 *  - onOpenChange: (open: boolean) => void
 * Name, username aur photo, teeno optional hain.
 */
export default function EditProfileDialog({ open, onOpenChange }) {
  const auth = useAuth();
  const { user, profile } = auth;
  const refresh = auth.refreshProfile || auth.refreshUser;

  const fileRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onTouched",
    defaultValues: toFormValues(null, null),
  });

  // Dialog kholte waqt hi form bharta hai (typing ke dauran reset nahi hota)
  useEffect(() => {
    if (!open) return;
    reset(toFormValues(profile, user));
    setPhotoFile(null);
    setPreview(null);
    setRemovePhoto(false);
    setPhotoError("");
    setUsernameStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user?.uid]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const fullNameValue = watch("fullName");
  const usernameValue = sanitizeUsername(watch("username"));
  const displayName = fullNameValue || profile?.name || user?.email || "U";
  const currentPhoto = removePhoto ? null : preview || profile?.photoURL;
  const hasChanges = isDirty || !!photoFile || removePhoto;

  // Live username check
  useEffect(() => {
    const original = sanitizeUsername(profile?.username);
    if (
      !open ||
      !user ||
      !usernameValue ||
      !USERNAME_RE.test(usernameValue) ||
      usernameValue === original
    ) {
      setUsernameStatus("idle");
      return;
    }
    setUsernameStatus("checking");
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const taken = await isUsernameTaken(usernameValue, user.uid);
        if (!cancelled) setUsernameStatus(taken ? "taken" : "available");
      } catch {
        if (!cancelled) setUsernameStatus("idle");
      }
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [usernameValue, profile?.username, user, open]);

  const handleOpenChange = (value) => {
    if (isSubmitting) return; // save chal raha ho to band na ho
    onOpenChange?.(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ACCEPTED.includes(file.type)) {
      setPhotoError("Sirf JPG, PNG ya WEBP allowed hai.");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setPhotoError(`Image ${MAX_IMAGE_MB}MB se chhoti honi chahiye.`);
      return;
    }
    setPhotoError("");
    setRemovePhoto(false);
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPreview(null);
    setPhotoError("");
    setRemovePhoto(true);
  };

  const onSubmit = async (values) => {
    if (!user) return;

    if (usernameStatus === "taken") {
      setError("username", {
        type: "manual",
        message: "Username already taken",
      });
      return;
    }

    // Khali chhoda ho to purani value barqarar rehti hai
    const fullName = (values.fullName || "").trim();
    const username = sanitizeUsername(values.username);

    const payload = {
      uid: user.uid,
      email: user.email,
      fullName: fullName || profile?.fullName || profile?.name || "",
      name: fullName || profile?.name || profile?.fullName || "",
      username: username || sanitizeUsername(profile?.username),
    };

    try {
      await updateProfileInfo(user.uid, payload);

      if (photoFile) {
        await updateAvatar(user.uid, photoFile);
      } else if (removePhoto && profile?.photoURL) {
        await removeAvatar(user.uid);
      }

      if (refresh) await refresh();
      notificationService.success("Profile updated");
      onOpenChange?.(false);
    } catch (error) {
      console.error("Save profile error:", error.code, error.message);
      if (error.message === "USERNAME_TAKEN") {
        setError("username", {
          type: "manual",
          message: "Username already taken",
        });
        setUsernameStatus("taken");
        return;
      }
      notificationService.error("Could not save profile. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            All fields are optional. Leave a field blank to keep its previous
            value.{" "}
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Photo */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentPhoto || undefined} alt={displayName} />
              <AvatarFallback className="text-xl">
                {displayName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {currentPhoto ? "Change" : "Upload"}
                </Button>
                {currentPhoto && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePhoto}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, PNG ya WEBP, max {MAX_IMAGE_MB}MB.
              </p>
              {photoError && (
                <p className="text-sm text-destructive">{photoError}</p>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="dlg-fullName">Name</Label>
            <Input
              id="dlg-fullName"
              placeholder="Your name"
              aria-invalid={!!errors.fullName}
              {...register("fullName", {
                maxLength: { value: 60, message: "Max 60 characters" },
              })}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="dlg-username">Username</Label>
            <div className="relative">
              <Input
                id="dlg-username"
                placeholder="username"
                autoComplete="off"
                className="pr-9"
                aria-invalid={!!errors.username || usernameStatus === "taken"}
                {...register("username", {
                  setValueAs: (v) => (v || "").trim().toLowerCase(),
                  validate: (v) =>
                    !v ||
                    USERNAME_RE.test(v) ||
                    "3-20 characters: a-z, 0-9 and underscore only",
                })}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {usernameStatus === "checking" && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {usernameStatus === "available" && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
                {usernameStatus === "taken" && (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </span>
            </div>
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
            {!errors.username && usernameStatus === "taken" && (
              <p className="text-sm text-destructive">Username already taken</p>
            )}
            {!errors.username && usernameStatus === "available" && (
              <p className="text-sm text-green-600">Username available</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => onOpenChange?.(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-profile-form"
            disabled={
              isSubmitting || !hasChanges || usernameStatus === "checking"
            }
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
