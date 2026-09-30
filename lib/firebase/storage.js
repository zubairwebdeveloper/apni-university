"use client";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./client";

/**
 * Uploads a file with progress reporting.
 * @param {string} path - storage path e.g. `users/{uid}/avatar`
 * @param {File} file
 * @param {(progress: number) => void} onProgress
 */
export function uploadFile(path, file, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

export async function deleteFile(path) {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
}
