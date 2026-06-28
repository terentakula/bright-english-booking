import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "client" | "admin" | "guest";

type AuthStore = {
  role: UserRole ;
  loginAs: (role: UserRole) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      role: "guest",

      loginAs: (role) =>
        set({
          role,
        }),
      logout: () =>
        set({
          role: "guest",
        }),
    }),
    {
      name: "bright-english-auth",
    },
  ),
);
