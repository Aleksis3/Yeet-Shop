import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { User } from "firebase/auth";

// Define a type for the slice state
interface authState {
  user: User;
}

interface userData {
  email: string;
  password: string;
  name?: string;
}

// Define the initial state using that type
const initialState = <any>{};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState;
    });
  },
});

// export const {signup } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export const signup = createAsyncThunk(
  "auth/signup",
  async (registerCredentials: userData) => {
    const { email, password } = registerCredentials;
    const promise = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user.uid;
      })
      .catch((error) => {
        console.log(error.message);
      });
    const data = await promise;
    return data;
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (signinCredentials: userData, { rejectWithValue }) => {
    const { email, password } = signinCredentials;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      });
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const promise = signOut(auth).catch((error) => {
    console.log(error.message);
  });
});

export default authSlice.reducer;
