import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../lib/types";

export interface IUserDetInitialState {
  user: User | null;
}

const initialState: IUserDetInitialState = {
  user: null,
};

const userDetSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default userDetSlice.reducer;
export const { setUser } = userDetSlice.actions;
