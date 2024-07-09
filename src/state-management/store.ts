import { configureStore } from "@reduxjs/toolkit";
import { counter } from "./counterSlice/counterSlice";

export const store = configureStore({
  reducer: {
    counter,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
