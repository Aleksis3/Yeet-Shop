import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { RootState } from "./store";

export interface IReview {
  author?: string;
  date?: {
    seconds: number;
    nanoseconds: number;
  };
  bookId: string;
  score: number;
  content: string;
  id?: string;
}

interface reviewState {
  reviews: IReview[];
}

const initialState = <reviewState>{
  reviews: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    fetchReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReview.rejected, (state, action) => {
      alert(action.payload);
    });
  },
});

export const addReview = createAsyncThunk(
  "review/addReview",
  async (details: IReview, { getState }) => {
    const { bookId, score, content } = details;
    const state = getState() as RootState;
    const username = state.auth.login;
    try {
      await setDoc(doc(db, "books", "reviews", bookId, username), {
        id: nanoid(),
        content,
        score,
        author: username,
        date: Timestamp.now(),
      });
      alert("Your review has been added!");
    } catch (e) {
      alert(e);
    }
  }
);

export const { fetchReviews } = reviewSlice.actions;

export const selectReviews = (state: RootState) => state.review.reviews;

export default reviewSlice.reducer;
