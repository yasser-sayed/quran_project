import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAudio, IRadio, ISurah, TMoshaf } from "../../lib/types";

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
        reciterId: number;
      }>
    ) => {
      const { moshaf, suwar, img, name, reciterId } = action.payload;

      const surah_List = moshaf.surah_list.split(",");

      const newPlayList = surah_List.map(
        (surah, index): IAudio => ({
          id: index,
          src: `${moshaf.server}/${surah.padStart(3, "0")}.mp3`,
          img,
          name: suwar.find((sur) => sur.id === +surah)?.name,
          writer: name,
          writerId: reciterId,
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

    //set radio list
    setRadioList: (state, action: PayloadAction<IRadio[]>) => {
      let newPlayList = action.payload.map(
        (radio): IAudio => ({
          id: radio.id,
          src: radio.url,
          name: radio.name,
          live: true,
        })
      );

      state.playList = newPlayList;
      state.playingAudio = newPlayList[0];
      state.audioIndex = 0;
    },

    //fix playList indexs
    fixPlayListIndexs: (state) => {
      let newPlayList = state.playList.map((item, i) => ({ ...item, id: i }));
      state.playList = newPlayList;
    },
  },
});

export default soundPlayerSlice.reducer;
export const {
  setPlayList,
  setPlayingAudio,
  setAudioIndex,
  setReadyPlayList,
  setRadioList,
  fixPlayListIndexs,
} = soundPlayerSlice.actions;
