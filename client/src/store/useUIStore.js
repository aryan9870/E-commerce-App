import { create } from "zustand";

const useUIStore = create((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));

export default useUIStore;