import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const favouritesSlice = createSlice({
  name: "favourite", 
  initialState,
  reducers: {
    add: (state, action) => {
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
    remove: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  
  },
});

export const { add, remove } = favouritesSlice.actions;

export default favouritesSlice.reducer;
