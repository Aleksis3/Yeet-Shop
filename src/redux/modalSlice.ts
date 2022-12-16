import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface modalState {
  isOpen: boolean;
}

const initialState = <modalState>{ isOpen: false };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsModal = (state: RootState) => state.auth.isOpen;
export default modalSlice.reducer;
