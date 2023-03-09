import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { RootState } from "./store";
import { IBook } from "../types/types";

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
    fetchCart: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWithThunk.rejected, (state, action) => {
      alert(action.error.message);
    });
    builder.addCase(removeWithThunk.rejected, (state, action) => {
      alert(action.error.message);
    });
  },
});

export const addWithThunk = createAsyncThunk(
  "auth/addWithThunk",
  async (book: IBook, { getState }) => {
    const { title, id, img, price } = book;
    const state = getState() as RootState;
    const user = state.auth.uid;
    if (user) {
      await setDoc(
        doc(db, "test", user, "cart", id),
        {
          id,
          title,
          img,
          price,
          quantity: increment(1),
        },
        { merge: true }
      );
    }
  }
);

export const removeWithThunk = createAsyncThunk(
  "auth/removeWithThunk",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user = state.auth.uid;
    const docRef = doc(db, "test", `${user}`, "cart", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const quantity = docSnap.data().quantity;
      if (quantity > 1) {
        await setDoc(
          docRef,
          {
            quantity: increment(-1),
          },
          { merge: true }
        );
      } else {
        await deleteDoc(docRef);
      }
    }
  }
);

export const cleanCart = createAsyncThunk(
  "auth/cleanCart",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const user = state.auth.uid;
    const docRef = collection(db, "test", `${user}`, "cart");
    try {
      const snapshot = await getDocs(docRef);
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (e) {
      alert(e);
    }
  }
);

export const { fetchCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectItemsCount = (state: RootState) =>
  state.cart.items.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, product) => {
    return +(total + product.price * product.quantity).toFixed(2);
  }, 0);

export default cartSlice.reducer;
