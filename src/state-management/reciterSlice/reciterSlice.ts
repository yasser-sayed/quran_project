import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAudio, IReciter, ISurah, TMoshaf } from "../../lib/types";

export interface IReciterInitialState {
  reciter: null | IReciter;
  suwarList: IAudio[];
  searchSuwarList: IAudio[];
  moshafType: number;
  moshaf: TMoshaf | null;
  searchOn: boolean;
}

const initialState: IReciterInitialState = {
  suwarList: [],
  moshafType: 0,
  moshaf: null,
  reciter: null,
  searchSuwarList: [],
  searchOn: false,
};

const reciterSlice = createSlice({
  name: "ReciterSlice",
  initialState,
  reducers: {
    setSuwarList: (
      state,
      action: PayloadAction<{
        suwar: ISurah[];
        img: string;
        name: string;
        reciterId: number;
      }>
    ) => {
      const { suwar, img, name, reciterId } = action.payload;

      const surah_List = state.moshaf?.surah_list.split(",");

      const newSuwarList = surah_List?.map(
        (surah, index): IAudio => ({
          id: index,
          src: `${state.moshaf?.server}/${surah.padStart(3, "0")}.mp3`,
          img,
          name: suwar.find((sur) => sur.id === +surah)?.name,
          writer: name,
          writerId: reciterId,
        })
      );

      state.suwarList = newSuwarList ? newSuwarList : [];
    },

    //set moshaf type (rewaya id)
    setMoshafType: (state, action: PayloadAction<number>) => {
      state.moshafType = action.payload;
    },
    setMoshaf: (state) => {
      const newMoshaf = state.reciter?.moshaf.find(
        (moshaf) => moshaf.moshaf_type == state.moshafType
      );
      state.moshaf = newMoshaf ? newMoshaf : null;
    },

    //set reciter in component mount
    setReciter: (state, action: PayloadAction<IReciter>) => {
      state.reciter = action.payload;
    },

    //search function
    setWithReciterSearch: (state, { payload }: PayloadAction<string>) => {
      if (payload) {
        const searchArr = state.suwarList.filter((surah) =>
          surah.name?.includes(payload)
        );
        state.searchOn = true;
        state.searchSuwarList = searchArr;
      } else {
        state.searchOn = false;
        state.searchSuwarList = [];
      }
    },
  },
});

export default reciterSlice.reducer;
export const {
  setMoshaf,
  setMoshafType,
  setSuwarList,
  setReciter,
  setWithReciterSearch,
} = reciterSlice.actions;
