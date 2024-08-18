import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INavBarInitialState {
  navH: number;
}

const initialState: INavBarInitialState = {
  navH: 128,
};

const navBarSlice = createSlice({
  name: "navBarSlice",
  initialState,
  reducers: {
    setNavH: (state, action: PayloadAction<number>) => {
      state.navH = action.payload;
    },
  },
});

export default navBarSlice.reducer;
export const { setNavH } = navBarSlice.actions;
