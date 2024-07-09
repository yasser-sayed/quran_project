import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state) {
      state.count++;
    },

    incAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const counter = counterSlice.reducer;
export const { incremented, incAmount } = counterSlice.actions;
