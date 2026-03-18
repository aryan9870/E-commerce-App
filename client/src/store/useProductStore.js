import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    fetchProducts: async () => {
        try {
            const res = await axios.get(`${API_URL}/products`);
            set({ products: res.data.products });
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
}))