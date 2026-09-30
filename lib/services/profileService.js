"use client";

import {
  getDocument,
  setDocument,
  updateDocument,
  findByField,
} from "@/lib/firebase/firestore";

import { uploadFile, deleteFile } from "@/lib/firebase/storage";

import { AVATAR_MAX_SIZE_MB, AVATAR_ACCEPTED_TYPES } from "@/lib/constants/app";

export const profileService = {
  async getProfile(uid) {
    if (!uid) return null;

    return getDocument("users", uid);
  },

  async getProfileByUsername(username) {
    if (!username) return null;

    const normalizedUsername = username.trim().toLowerCase();

    const results = await findByField(
      "users",
      "username",
      normalizedUsername,
      1,
    );

    return results[0] || null;
  },

  async updateProfile(uid, data) {
    if (!uid) {
      throw new Error("User ID is required.");
    }

    return updateDocument("users", uid, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async isUsernameTaken(username, currentUid) {
    if (!username) return false;

    const normalizedUsername = username.trim().toLowerCase();

    const results = await findByField(
      "users",
      "username",
      normalizedUsername,
      1,
    );

    if (!results.length) {
      return false;
    }

    return results[0].id !== currentUid;
  },

  validateAvatarFile(file) {
    if (!file) {
      throw new Error("Please select an image.");
    }

    if (!AVATAR_ACCEPTED_TYPES.includes(file.type)) {
      throw new Error("Only JPG, PNG or WEBP images are allowed.");
    }

    const maxBytes = AVATAR_MAX_SIZE_MB * 1024 * 1024;

    if (file.size > maxBytes) {
      throw new Error(`Image must be smaller than ${AVATAR_MAX_SIZE_MB}MB.`);
    }
  },

  async uploadAvatar(uid, file, onProgress) {
    if (!uid) {
      throw new Error("User ID is required.");
    }

    this.validateAvatarFile(file);

    const path = `users/${uid}/avatar`;

    const url = await uploadFile(path, file, onProgress);

    await updateDocument("users", uid, {
      photoURL: url,
      updatedAt: new Date(),
    });

    return url;
  },

  async removeAvatar(uid) {
    if (!uid) {
      throw new Error("User ID is required.");
    }

    const path = `users/${uid}/avatar`;

    try {
      await deleteFile(path);
    } catch {
      // Avatar may not exist.
    }

    await updateDocument("users", uid, {
      photoURL: null,
      updatedAt: new Date(),
    });
  },
};
