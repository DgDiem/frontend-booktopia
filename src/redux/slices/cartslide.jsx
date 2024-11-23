import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart", // Tên của slice là "cart"
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item._id === action.payload.item._id);
      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + Number(action.payload.quantity);
      } else {
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity = Math.max(item.quantity + quantity, 1); // Đảm bảo số lượng không âm
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
