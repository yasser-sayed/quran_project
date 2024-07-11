import { configureStore } from "@reduxjs/toolkit";
import users from "./fetchingDataSlices/usersSlice";
import userDet from "./userDetSlice/userDetSlice";
import userApis from "./fetchingDataSlices/userApis";

export const store = configureStore({
  reducer: {
    users,
    userDet,
    userApis,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
