import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CartState {
  items: { id: number; name: string; price: number; quantity: number }[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (obj) => obj.id === action.payload.id
      );
      const currItem = state.items[itemIndex];
      if (currItem) {
        currItem.quantity += 1;
        state.items[itemIndex] = currItem;
      } else {
        action.payload.quantity = 1;
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex((obj) => obj.id === id);
      const currItem = state.items[itemIndex];
      if (currItem.quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      } else {
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
