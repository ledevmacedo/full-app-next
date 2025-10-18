import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface authProps {
  status: number;
  label: string;
  loaded: boolean;
}

export interface authInfo {
  auth: authProps;
}

const initialState: authProps = {
  status: 0,
  label: "",
  loaded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    setAuthLabel: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
    },
  },
});

export const { setAuthStatus, setAuthLabel } = authSlice.actions;
export default authSlice.reducer;
