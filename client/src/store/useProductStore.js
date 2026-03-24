import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
  products: [],

  filters: {
    category: [],
    type: [],
    price: [0, 2000],
    sizes: [],
  },

  setProducts: (products) => set({ products }),
  setFilters: (filters) => set({ filters }),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchProducts: async (q = "") => {  
    try {
      const res = await axios.get(`${API_URL}/products`, {params: {q}});
      set({ products: res.data.products });
      console.log(res.data.products);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
}));
