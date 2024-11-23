// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartslide"; // Nhập slice chính xác
import favouritesSlice from "./slices/favouritesSlide";

export const store = configureStore({
  reducer: {
    cart: cartSlice, // Không cần .reducer
    favourite: favouritesSlice, 
  },
});

export default store;
