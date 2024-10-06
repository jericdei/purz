import { create } from "zustand";
import axios from "~/lib/axios";
import { User } from "~/lib/types";

interface UserStore {
  updatePassCode: (id: string, passcode: string) => Promise<User>;
  verifyPassCode: (id: string, passcode: string) => Promise<boolean>;
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
  verifyPassCode: async (id, passcode) => {
    try {
      const { data } = await axios.post(`/users/${id}/passcode/verify`, {
        passcode,
      });

      return data.verified;
    } catch (error) {
      console.error(error);
    }
  },
}));
