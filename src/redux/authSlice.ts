import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { RootState } from "./store";
import { auth } from "../firebase/firebase";

// Define a type for the slice state
export interface authState {
  // user: User;
  uid: string;
}

interface userData {
  email: string;
  password: string;
  login?: string;
}

// Define the initial state using that type
const initialState = <any>{ uid: null };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.auth.uid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.uid = action.payload;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.uid = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState;
    });
  },
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (registerCredentials: userData) => {
    const { email, password } = registerCredentials;
    const promise = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
    const data = await promise;
    return data;
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (signinCredentials: userData) => {
    const { email, password } = signinCredentials;
    const promise = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        console.log(userCredential.user);
        return user;
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
    const data = await promise;
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const promise = signOut(auth).catch((error) => {
    console.log(error.message);
  });
});

export const selectUser = (state: RootState) => state.auth.uid;

export default authSlice.reducer;
