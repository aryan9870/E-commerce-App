import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: async (productId, quantity, size, color) => {
    try {
      const response = await axios.post(
        `${API_URL}/carts`,
        {
          productId,
          quantity,
          size,
          color,
        },
        {
          withCredentials: true,
        },
      );
      toast.success(response.data.message);
      console.log(response.data);

     set({ cart: response.data.cart });

    } catch (error) {
      console.log(error.response);
      if (error.response.data.errors) {
        toast.error(error.response.data.errors[0].message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  },

  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/carts`, {
        withCredentials: true,
      });
      set({ cart: response.data.cart });
    } catch (error) {
      console.log(error.response);
    }
  },
}));

export default useCartStore;
