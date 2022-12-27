import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { RootState } from "./store";

interface reviewState {
  reviews: {
    id: string;
    user: string;
    date: string;
    score: number;
    content: string;
  }[];
  averageScore: number;
  totalReviews: number;
}

interface IReview {
  bookId: string;
  score: number;
  content: string;
}

const initialState = <reviewState>{
  reviews: [],
  averageScore: 0,
  totalReviews: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      console.log(action);
      //   state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReview.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const addReview = createAsyncThunk(
  "review/addReview",
  async (details: IReview, { getState }) => {
    const { bookId, score, content } = details;
    const state = getState() as RootState;
    const user = state.auth.uid;
    try {
      await addDoc(collection(db, "reviews", bookId), {
        bookId,
        content,
        score,
        author: user,
      });
      alert("Your review has been added!");
    } catch (e) {
      alert(e);
    }
  }
);

// export const addReview = createAsyncThunk(
//     "auth/addReview",
//     async (f, { getState }) => {
//       try {
//         const { auth } = getState() as RootState;
//         const uid = auth.uid;
//         return uid;
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   );
