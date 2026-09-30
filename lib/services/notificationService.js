"use client";

import { toast } from "sonner";

/**
 * Thin wrapper around Sonner so toast usage stays consistent
 * across the app and is easy to swap out later.
 */
export const notificationService = {
  success(message, options) {
    toast.success(message, options);
  },
  error(message, options) {
    toast.error(message, options);
  },
  info(message, options) {
    toast(message, options);
  },
  loading(message, options) {
    return toast.loading(message, options);
  },
  dismiss(id) {
    toast.dismiss(id);
  },
  promise(promise, messages) {
    return toast.promise(promise, messages);
  },
};
