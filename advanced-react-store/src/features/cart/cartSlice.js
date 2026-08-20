import { createSlice } from "@reduxjs/toolkit";

const savedCart = sessionStorage.getItem("cart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const saveCart = (items) => {
  sessionStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },

    checkout: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, checkout } = cartSlice.actions;
export default cartSlice.reducer;