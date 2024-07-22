import { combineReducers, configureStore } from "@reduxjs/toolkit";
import users from "./fetchingDataSlices/usersSlice";
import userDet from "./userDetSlice/userDetSlice";
import userApis from "./fetchingDataSlices/userApis";
import auth from "./userDetSlice/userLoginSlice";
import storage from "redux-persist/lib/storage";
import settings from "./settingsSlice/settingsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { quranApiSlice } from "./fetchingDataSlices/quranApiSlice";
import soundPlayer from "./soundSlices/soundPlayerSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "settings"],
};

const mainReducers = combineReducers({
  users,
  userDet,
  userApis,
  auth,
  settings,
  soundPlayer,
  [quranApiSlice.reducerPath]: quranApiSlice.reducer,
});

const reducer = persistReducer(persistConfig, mainReducers);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(quranApiSlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
