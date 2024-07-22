import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AudioData, PlayList } from "react-modern-audio-player";
import { ISurah, TMoshaf } from "../../lib/types";

export interface ISoundPlayerInitialState {
  playList: PlayList;
}

const initialState: ISoundPlayerInitialState = {
  playList: [],
};

const soundPlayerSlice = createSlice({
  name: "soundPlayer",
  initialState,
  reducers: {
    setPlayList: (
      state,
      action: PayloadAction<{
        moshaf: TMoshaf;
        suwar: ISurah[];
        img: string;
        name: string;
      }>
    ) => {
      const { moshaf, suwar, img, name } = action.payload;

      const surah_List = moshaf.surah_list.split(",");

      const newPlayList = surah_List.map(
        (surah, index): AudioData => ({
          id: index,
          src: `${moshaf.server}/${surah.padStart(3, "0")}.mp3`,
          img,
          name: suwar.find((sur) => sur.id === +surah)?.name,
          writer: name,
        })
      );

      state.playList = newPlayList;
    },
  },
});

export default soundPlayerSlice.reducer;
export const { setPlayList } = soundPlayerSlice.actions;
