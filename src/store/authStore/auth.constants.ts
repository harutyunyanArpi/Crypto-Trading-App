/** How long a session stays valid (in ms) */
export const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

/** Storage key for persisted auth state */
export const AUTH_STORAGE_KEY = "auth";

/** Environment variable key for encryption */
export const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
