import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { RootState } from "./store";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define a type for the slice state
export interface authState {
  email: string;
  uid: string;
  login: string;
}

interface userData {
  email: string;
  password: string;
  login?: string;
}

const initialState = <any>{ uid: null, login: null };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState;
    });
  },
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (registerCredentials: userData) => {
    const { email, password, login } = registerCredentials;
    const promise = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        return uid;
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
    const uid = await promise;
    // create user's detailed information page in firebase
    if (uid) {
      try {
        setDoc(doc(db, "users", uid), {
          login,
          uid,
          email,
        });
      } catch (e) {
        alert(e);
      }
    }
    // return user's data
    return { uid, login, email };
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (signinCredentials: userData) => {
    const { email, password } = signinCredentials;
    const promise = signInWithEmailAndPassword(auth, email, password)
      // recieve user's id by using fireauth function
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        return uid;
      })
      // then use the recieved value to fetch more detailed data
      // from his personal firebase profile
      .then(async (uid) => {
        const userDetails = await getDoc(doc(db, "users", uid));
        return userDetails.data();
      })
      .catch((error) => {
        alert(error.message);
      });
    const data = await promise;
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  signOut(auth).catch((error) => {
    console.log(error.message);
  });
});

export const selectUserId = (state: RootState) => state.auth.uid;
export const selectUserLogin = (state: RootState) => state.auth.login;

export default authSlice.reducer;
