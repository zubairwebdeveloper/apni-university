"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MAX_IMAGE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const FALLBACK_ROUTE = "/dashboard";
const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

/* ---------- helpers ---------- */

// "john.doe" -> "john_doe" (purane usernames form ko invalid nahi karenge)
const sanitizeUsername = (v) =>
  (v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .slice(0, 20);

const normalizeUrl = (v) => {
  const t = (v || "").trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
};

const isValidUrl = (v) => {
  try {
    const u = new URL(normalizeUrl(v));
    return u.hostname.includes(".");
  } catch {
    return false;
  }
};

// "@handle" ko x.com link bana deta hai
const normalizeTwitter = (v) => {
  const t = (v || "").trim();
  if (!t) return "";
  if (t.startsWith("@")) return `https://x.com/${t.slice(1)}`;
  return normalizeUrl(t);
};

const toFormValues = (profile, user) => ({
  fullName: profile?.fullName || profile?.name || user?.displayName || "",
  username: sanitizeUsername(
    profile?.username || (user?.email || "").split("@")[0],
  ),
  phone: profile?.phone || "",
  location: profile?.location || "",
  website: profile?.website || "",
  bio: profile?.bio || "",
  twitter: profile?.socialLinks?.twitter || "",
  linkedin: profile?.socialLinks?.linkedin || "",
  github: profile?.socialLinks?.github || "",
});

const FieldError = ({ error }) =>
  error ? <p className="text-sm text-destructive">{error.message}</p> : null;

/* ---------- component ---------- */

export default function EditProfileForm() {
  const router = useRouter();
  const auth = useAuth();
  const { user, profile } = auth;
  const refresh = auth.refreshProfile || auth.refreshUser;

  const fileRef = useRef(null);
  const initKeyRef = useRef(null);
  const savedRef = useRef(false);

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("idle"); // idle | checking | available | taken

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

  /* Form sirf tab bharta hai jab user/profile pehli baar aaye.
     Baad mein profile object badalne par typed data clear NAHI hota. */
  useEffect(() => {
    if (!user) return;
    const key = `${user.uid}:${profile ? "loaded" : "empty"}`;
    if (initKeyRef.current === key) return;
    initKeyRef.current = key;
    reset(toFormValues(profile, user));
  }, [user, profile, reset]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const bioLength = watch("bio")?.length || 0;
  const fullNameValue = watch("fullName");
  const usernameValue = sanitizeUsername(watch("username"));
  const displayName = fullNameValue || user?.email || "U";
  const currentPhoto = removePhoto ? null : preview || profile?.photoURL;
  const hasChanges = isDirty || !!photoFile || removePhoto;

  /* Live username availability (debounced) */
  useEffect(() => {
    const original = sanitizeUsername(profile?.username);
    if (
      !user ||
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
  }, [usernameValue, profile?.username, user]);

  /* Unsaved changes warning */
  useEffect(() => {
    const handler = (e) => {
      if (hasChanges && !isSubmitting && !savedRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges, isSubmitting]);

  /* Redirect: ?next=/path -> pichhla page -> /dashboard */
  const goBack = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      router.push(next);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push(FALLBACK_ROUTE);
    }
  };

  /* Photo */
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

  const resetAll = () => {
    reset(toFormValues(profile, user));
    setPhotoFile(null);
    setPreview(null);
    setRemovePhoto(false);
    setPhotoError("");
  };

  /* Submit */
  const onSubmit = async (values) => {
    if (!user) return;

    if (usernameStatus === "taken") {
      setError("username", {
        type: "manual",
        message: "Username already taken",
      });
      return;
    }

    const payload = {
      uid: user.uid,
      email: user.email,
      fullName: (values.fullName || "").trim(),
      name: (values.fullName || "").trim(),
      username: sanitizeUsername(values.username),
      phone: (values.phone || "").trim(),
      location: (values.location || "").trim(),
      website: normalizeUrl(values.website),
      bio: (values.bio || "").trim(),
      socialLinks: {
        twitter: normalizeTwitter(values.twitter),
        linkedin: normalizeUrl(values.linkedin),
        github: normalizeUrl(values.github),
      },
    };

    try {
      await updateProfileInfo(user.uid, payload);

      if (photoFile) {
        await updateAvatar(user.uid, photoFile);
      } else if (removePhoto && profile?.photoURL) {
        await removeAvatar(user.uid);
      }

      if (refresh) await refresh();

      // Saved values ko form mein rakho (data clear nahi hoga)
      reset({
        fullName: payload.fullName,
        username: payload.username,
        phone: payload.phone,
        location: payload.location,
        website: payload.website,
        bio: payload.bio,
        twitter: payload.socialLinks.twitter,
        linkedin: payload.socialLinks.linkedin,
        github: payload.socialLinks.github,
      });
      setPhotoFile(null);
      setPreview(null);
      setRemovePhoto(false);
      savedRef.current = true;

      notificationService.success("Profile updated");
      goBack();
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

  const onInvalid = () =>
    notificationService.error("Please fix the highlighted fields.");

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="space-y-6"
      noValidate
    >
      {/* Photo (optional) */}
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
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              <Camera className="mr-2 h-4 w-4" />
              {currentPhoto ? "Change photo" : "Upload photo"}
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
            Optional. JPG, PNG ya WEBP, max {MAX_IMAGE_MB}MB.
          </p>
          {photoError && (
            <p className="text-sm text-destructive">{photoError}</p>
          )}
        </div>
      </div>

      {/* Name + username */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Your name"
            aria-invalid={!!errors.fullName}
            {...register("fullName", {
              required: "Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
              maxLength: { value: 60, message: "Max 60 characters" },
            })}
          />
          <FieldError error={errors.fullName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input
              id="username"
              placeholder="username"
              autoComplete="off"
              className="pr-9"
              aria-invalid={!!errors.username || usernameStatus === "taken"}
              {...register("username", {
                required: "Username is required",
                setValueAs: (v) => (v || "").trim().toLowerCase(),
                pattern: {
                  value: USERNAME_RE,
                  message: "3-20 characters: a-z, 0-9 and underscore only",
                },
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
          <FieldError error={errors.username} />
          {!errors.username && usernameStatus === "taken" && (
            <p className="text-sm text-destructive">Username already taken</p>
          )}
          {!errors.username && usernameStatus === "available" && (
            <p className="text-sm text-green-600">Username available</p>
          )}
        </div>
      </div>

      {/* Email (read only) */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={user?.email || ""} disabled readOnly />
        <p className="text-xs text-muted-foreground">
          Email yahan se change nahi hoti.
        </p>
      </div>

      {/* Phone + location */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+92 300 1234567"
            aria-invalid={!!errors.phone}
            {...register("phone", {
              validate: (v) =>
                !v ||
                /^[+()\d\s-]{7,20}$/.test(v) ||
                "Enter a valid phone number",
            })}
          />
          <FieldError error={errors.phone} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (optional)</Label>
          <Input
            id="location"
            placeholder="City, Country"
            aria-invalid={!!errors.location}
            {...register("location", {
              maxLength: { value: 80, message: "Max 80 characters" },
            })}
          />
          <FieldError error={errors.location} />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website (optional)</Label>
        <Input
          id="website"
          placeholder="example.com"
          aria-invalid={!!errors.website}
          {...register("website", {
            validate: (v) => !v || isValidUrl(v) || "Enter a valid website",
          })}
        />
        <FieldError error={errors.website} />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio (optional)</Label>
        <Textarea
          id="bio"
          rows={4}
          placeholder="Apne baare mein likhein..."
          aria-invalid={!!errors.bio}
          {...register("bio", {
            maxLength: { value: 200, message: "Max 200 characters" },
          })}
        />
        <div className="flex justify-between text-xs">
          <span className="text-destructive">{errors.bio?.message}</span>
          <span
            className={
              bioLength > 200 ? "text-destructive" : "text-muted-foreground"
            }
          >
            {bioLength}/200
          </span>
        </div>
      </div>

      {/* Social links */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter / X</Label>
          <Input
            id="twitter"
            placeholder="@handle ya link"
            aria-invalid={!!errors.twitter}
            {...register("twitter", {
              validate: (v) =>
                !v || isValidUrl(normalizeTwitter(v)) || "Enter a valid link",
            })}
          />
          <FieldError error={errors.twitter} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/..."
            aria-invalid={!!errors.linkedin}
            {...register("linkedin", {
              validate: (v) => !v || isValidUrl(v) || "Enter a valid link",
            })}
          />
          <FieldError error={errors.linkedin} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            placeholder="github.com/..."
            aria-invalid={!!errors.github}
            {...register("github", {
              validate: (v) => !v || isValidUrl(v) || "Enter a valid link",
            })}
          />
          <FieldError error={errors.github} />
        </div>
      </div>

      {hasChanges && !isSubmitting && (
        <p className="text-xs text-muted-foreground">
          Aap ki unsaved changes hain.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          disabled={
            isSubmitting || !hasChanges || usernameStatus === "checking"
          }
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting || !hasChanges}
          onClick={resetAll}
        >
          Reset
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={goBack}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
