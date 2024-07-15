import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserLogedInInitialState {
  logedIn: boolean;
  uIL1c5cVta2: string | null;
}

const initialState: UserLogedInInitialState = {
  logedIn: false,
  uIL1c5cVta2: null, //user id
};

const userLogedInSlice = createSlice({
  name: "userLogedIn",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.uIL1c5cVta2 = action.payload;
      state.logedIn = true;
    },
    unSetUserId: (state) => {
      state.uIL1c5cVta2 = null;
      state.logedIn = false;
    },
  },
});

export default userLogedInSlice.reducer;
export const { setUserId, unSetUserId } = userLogedInSlice.actions;
