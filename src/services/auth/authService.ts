import type { UserData } from "./authService.types";

export const login = async (
  email: string,
  password: string,
): Promise<UserData> => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ email });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};
