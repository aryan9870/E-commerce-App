import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isCheckingAuth: true,

  login: (userData) =>
    set({
      user: userData,
      isLoggedIn: true,
    }),

  signup: (userData) =>
    set({
      user: userData,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  checkAuth: async () => {
    try {
      const res = await axios.get(`${API_URL}/users/is-auth`, {
        withCredentials: true,
      });
      if (res.data.success) {
        set({
          user: res.data.user,
          isLoggedIn: true,
        });
      }
    } catch (error) {
      set({
        user: null,
        isLoggedIn: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
