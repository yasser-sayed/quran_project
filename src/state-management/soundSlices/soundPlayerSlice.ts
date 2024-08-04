import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAudio, ISurah, TMoshaf } from "../../lib/types";

export interface ISoundPlayerInitialState {
  playList: IAudio[];
  playingAudio: IAudio | null;
  audioIndex: number;
}

const initialState: ISoundPlayerInitialState = {
  playList: [],
  playingAudio: null,
  audioIndex: 0,
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
        (surah, index): IAudio => ({
          id: index,
          src: `${moshaf.server}/${surah.padStart(3, "0")}.mp3`,
          img,
          name: suwar.find((sur) => sur.id === +surah)?.name,
          writer: name,
        })
      );

      state.playList = newPlayList;
      state.playingAudio = newPlayList[0];
      state.audioIndex = 0;
    },

    //set the playing audio object
    setPlayingAudio: (state, action: PayloadAction<IAudio>) => {
      state.playingAudio = action.payload;
      state.audioIndex = action.payload.id;
    },

    //set the playing audio index
    setAudioIndex: (state, action: PayloadAction<number>) => {
      state.audioIndex = action.payload;
      state.playingAudio = state.playList[action.payload];
    },

    //set ready playlist
    setReadyPlayList: (state, action: PayloadAction<IAudio[]>) => {
      state.playList = action.payload;
      state.playingAudio = action.payload[0];
      state.audioIndex = 0;
    },
  },
});

export default soundPlayerSlice.reducer;
export const { setPlayList, setPlayingAudio, setAudioIndex, setReadyPlayList } =
  soundPlayerSlice.actions;
