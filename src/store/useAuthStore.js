import axiosInstance from "../lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: (user) => set({ authUser: user }),
  logIn: (user) => {
    set({ authUser: user });
  },
  logOut: () => {
    set({ authUser: null });
  },
}));
