import { createSlice } from "@reduxjs/toolkit";

type Lang = "ar" | "en";

export interface ISettingsInitialState {
  lang: Lang;
  isEn: boolean;
}

const initialState: ISettingsInitialState = {
  lang: "en",
  isEn: true,
};

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setArLang: (state) => {
      state.lang = "ar";
      state.isEn = false;
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    },
    setEnLang: (state) => {
      state.lang = "en";
      state.isEn = true;
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    },
  },
});

export default SettingsSlice.reducer;
export const { setArLang, setEnLang } = SettingsSlice.actions;
