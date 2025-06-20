import { z } from "zod";
import { create } from "zustand";
import { persist, type StorageValue } from "zustand/middleware";

import { login as loginApi } from "@/services/auth/authService";

import { encrypt, decrypt } from "@/utils/encryption";
import { loginSchema } from "./auth.schema";
import {
  SESSION_TIMEOUT_MS,
  AUTH_STORAGE_KEY,
  ENCRYPTION_KEY,
} from "./auth.constants";

import type { AuthState, User } from "./authStore.types";

const formatZodError = (issues: z.ZodIssue[]) =>
  issues.map((i) => i.message).join(", ");

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (email, password) => {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
          const error = formatZodError(result.error.issues);
          return { success: false, error };
        }

        const userApiResponse = await loginApi(email, password);
        const user: User = {
          ...userApiResponse,
          authenticatedAt: Date.now(),
        };

        set({ user });
        return { success: true };
      },

      logout: () => set({ user: null }),

      isSessionExpired: () => {
        const user = get().user;
        if (!user) return true;
        const maxAge = SESSION_TIMEOUT_MS;
        return Date.now() - user.authenticatedAt > maxAge;
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: {
        getItem: (name): StorageValue<AuthState> | null => {
          const stored = localStorage.getItem(name);
          return stored ? decrypt(stored, ENCRYPTION_KEY) : null;
        },
        setItem: (name, value) => {
          const encrypted = encrypt(value, ENCRYPTION_KEY);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
