import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { alertInfo } from "../types";

const initialState: alertInfo = {
  variant: "default",
  timeout: false,
  loaded: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Partial<alertInfo>>) => {
      Object.assign(state, action.payload);
    },
    openAlert: (
      state,
      action: PayloadAction<Partial<alertInfo> | undefined>
    ) => {
      Object.assign(state, { loaded: true, ...action.payload });
    },
    closeAlert: () => initialState,
    openSuccess: (
      state,
      action: PayloadAction<Partial<alertInfo> | undefined>
    ) => {
      Object.assign(state, {
        loaded: true,
        variant: "success",
        ...action.payload,
      });
    },
    openError: (
      state,
      action: PayloadAction<Partial<alertInfo> | undefined>
    ) => {
      Object.assign(state, {
        loaded: true,
        variant: "error",
        ...action.payload,
      });
    },
    openWarning: (
      state,
      action: PayloadAction<Partial<alertInfo> | undefined>
    ) => {
      Object.assign(state, {
        loaded: true,
        variant: "warning",
        ...action.payload,
      });
    },
    openLoading: (
      state,
      action: PayloadAction<Partial<alertInfo> | undefined>
    ) => {
      Object.assign(state, {
        loaded: true,
        variant: "loading",
        ...action.payload,
      });
    },
  },
});

export const {
  setAlert,
  openAlert,
  closeAlert,
  openSuccess,
  openError,
  openWarning,
  openLoading,
} = alertSlice.actions;
export default alertSlice.reducer;
