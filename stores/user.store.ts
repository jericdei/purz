import { create } from "zustand";
import axios from "~/lib/axios";
import { User } from "~/lib/types";

interface UserStore {
  updatePassCode: (id: string, passcode: string) => Promise<User>;
}

export const useUserStore = create<UserStore>(() => ({
  updatePassCode: async (id, passcode) => {
    try {
      const response = await axios.patch(`/users/${id}`, {
        passcode,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
}));
