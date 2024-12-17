import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const existingItem = state.data.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        message.warning("Item already in cart");
        return;
      }

      state.data.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    descrementQnty: (state, action) => {
      console.log(action.payload);
      state.data = state.data.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            message.warning("Quantity cannot be less than 1");
          }
        }
        return item;
      });
    },
    incrementQnty: (state, action) => {
      console.log(action.payload);
      state.data = state.data.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
  },
});

export const { addToCart, removeFromCart, descrementQnty, incrementQnty } =
  cartSlice.actions;
export default cartSlice.reducer;
