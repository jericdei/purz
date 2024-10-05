import { create } from "zustand";
import axios from "~/lib/axios";
import { User } from "~/lib/types";

interface AuthStore {
  user: User | null;
  setUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: async () => {
    try {
      const user = await axios.get("/auth/user");
      set({ user: user.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  },
}));
