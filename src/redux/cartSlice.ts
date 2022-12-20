import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, increment, setDoc } from "firebase/firestore";
import { resolve } from "path";
import { db } from "../firebase/firebase";
import { authState } from "./authSlice";
import { RootState } from "./store";

interface CartState {
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    img: string;
  }[];
  totalPrice: number;
  totalCount: number;
}

const initialState = <CartState>{
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
      state.totalCount += 1;
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
  extraReducers: (builder) => {
    builder.addCase(addWithThunk.rejected, (state, action) => {
      alert(action.error.message);
      console.log(action.error.message);
    });
  },
});

// addDoc(collection(db, `$users/${user.uid}/cart`), action.payload);

export const addWithThunk = createAsyncThunk(
  "auth/addWithThunk",
  async (book: any, { getState }) => {
    const { title, id, img, price } = book;
    const state = getState() as RootState;
    const user = state.auth.uid;
    await setDoc(
      doc(db, "usersss", user, "cart", id),
      {
        id,
        title,
        img,
        price,
        amount: increment(1),
      },
      { merge: true }
    );
  }
);

export const { addToCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectItemsCount = (state: RootState) =>
  state.cart.items.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, product) => {
    return total + product.price;
  }, 0);

export default cartSlice.reducer;
