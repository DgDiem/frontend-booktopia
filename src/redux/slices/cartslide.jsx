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
    updateCartItemQuantityDirectly: (state, action) => {
      const { id, newQuantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        // Kiểm tra số lượng nhập vào hợp lệ và không vượt quá số lượng tồn kho
        item.quantity = Math.max(newQuantity, 1); // Đảm bảo số lượng không âm và lớn hơn 0
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  updateCartItemQuantityDirectly,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
