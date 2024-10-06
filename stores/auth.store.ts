import { create } from "zustand";
import axios from "~/lib/axios";
import { User } from "~/lib/types";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: async () => {
    try {
      const user = await axios.get("/auth/user");
      set({ user: user.data, isAuthenticated: !!user.data });
    } catch (error) {
      return;
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  },
}));
