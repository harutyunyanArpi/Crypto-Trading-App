export type User = {
  email: string;
  authenticatedAt: number;
};

export type AuthState = {
  user: { email: string; authenticatedAt: number } | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isSessionExpired: () => boolean;
};
