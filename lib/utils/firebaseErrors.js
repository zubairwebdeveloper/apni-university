/**
 * Maps Firebase Auth error codes to friendly, user-facing messages.
 */
const ERROR_MAP = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/weak-password": "Password should be at least 8 characters.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/requires-recent-login": "Please sign in again to continue.",
};

export function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  return ERROR_MAP[code] || "Something went wrong. Please try again.";
}
