import { create } from "zustand";

const useAuthStore = create(
  (set) => ({
    user: null,
    token: null,
    isLoggedIn: false,

    login: (userData, token) =>
      set({
        user: userData,
        token,
        isLoggedIn: true,
      }),

    signup: (userData, token) =>
      set({
        user: userData,
        token,
        isLoggedIn: true,
      }),

    logout: () =>
      set({
        user: null,
        token: null,
        isLoggedIn: false,
      }),
  }),
  {
    name: "auth-storage",
  },
);

export default useAuthStore;
