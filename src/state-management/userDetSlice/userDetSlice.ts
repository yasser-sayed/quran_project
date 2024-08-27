import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAudio, IPlayList, IReciter, User } from "../../lib/types";
import axios from "axios";

export interface IUserDetInitialState {
  user: User | null;
  userLoading: boolean;
  userErr: null | string;
  isUpdated: boolean;
}

const initialState: IUserDetInitialState = {
  user: null,
  userLoading: false,
  userErr: null,
  isUpdated: false,
};

export const getUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "userDetails/getUser",
  async (userId, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const userData = await axios({
        method: "get",
        url: `http://localhost:3000/users/${userId}`,
      });

      return userData.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        return rejectWithValue(err.message);
      }
    }

    return rejectWithValue("un expected error");
  }
);

export const updateUser = createAsyncThunk<
  User,
  { userId: string; updates: Partial<User> },
  { rejectValue: string }
>("userDetails/updateUser", async ({ userId, updates }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const userData = await axios({
      method: "patch",
      url: `http://localhost:3000/users/${userId}`,
      data: updates,
    });

    return userData.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.message) {
      return rejectWithValue(err.message);
    }
  }
});

const userDetSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unSetUser: (state) => {
      state.user = null;
    },
    addLastPlayed: (state, action: PayloadAction<IAudio>) => {
      //function to generate a random id
      const generateRandomId = () => Math.floor(10000 + Math.random() * 90000);

      let newLastPlayedItem = { ...action.payload };
      if (state.user) {
        //check if the audio there or not
        state.user.lastPlayed = state.user.lastPlayed.filter(
          (audio) => audio.src !== newLastPlayedItem.src
        );

        //set the new id
        let randomId = generateRandomId();
        newLastPlayedItem.id = randomId;

        //set the new last played item
        state.user.lastPlayed = [newLastPlayedItem, ...state.user.lastPlayed];

        // Remove the oldest item if the array exceeds 20 items
        if (state.user.lastPlayed.length > 20) {
          state.user.lastPlayed.shift();
        }

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    // add to liked reciters
    likeReciter: (state, action: PayloadAction<IReciter>) => {
      if (state.user) {
        state.user.likedReciters = [
          ...state.user.likedReciters,
          action.payload,
        ];

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    // remove from liked reciters
    removeReciterLike: (state, action: PayloadAction<IReciter>) => {
      if (state.user) {
        let newLikedReciters: IReciter[] = state.user.likedReciters.filter(
          (reciter) => reciter.id !== action.payload.id
        );

        state.user.likedReciters = newLikedReciters;

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    //clear liked reciters
    clearLikedReciters: (state) => {
      if (state.user) {
        state.user.likedReciters = [];

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    // add new playlist
    addNewPlayList: (state, action: PayloadAction<IPlayList>) => {
      if (state.user) {
        state.user.playLists[action.payload.name] = action.payload;

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    // edit playlist
    editPlayList: (
      state,
      action: PayloadAction<{ playList: IPlayList; newPlayList: IPlayList }>
    ) => {
      const { newPlayList, playList } = action.payload;
      if (state.user) {
        //new key with the new name
        state.user.playLists[newPlayList.name] = {
          ...newPlayList,
          list: playList.list,
        };

        //delete the old one
        if (playList.name !== newPlayList.name) {
          delete state.user.playLists[playList.name];
        }

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    // delete playlist
    deletePlayList: (state, action: PayloadAction<IPlayList>) => {
      if (state.user) {
        delete state.user.playLists[action.payload.name];

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    //add audio to play list
    addAudioToPlayList: (
      state,
      action: PayloadAction<{ audio: IAudio; name: string }>
    ) => {
      const { audio, name } = action.payload;
      if (state.user) {
        let newAudio: IAudio = {
          ...audio,
          id: state.user.playLists[name].list.length,
        };

        state.user.playLists[name].list = [
          ...state.user.playLists[name].list,
          newAudio,
        ];

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },

    //remove audio from play list
    removeAudioFromPlayList: (
      state,
      action: PayloadAction<{ audio: IAudio; name: string }>
    ) => {
      const { audio, name } = action.payload;
      if (state.user) {
        let newList: IAudio[] = state.user.playLists[name].list
          .filter((item) => item.id !== audio.id)
          .map((item, i) => ({ ...item, id: i }));

        state.user.playLists[name].list = newList;

        // Update the isUpdated flag
        state.isUpdated = !state.isUpdated;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(
        getUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.userLoading = false;
          state.userErr = action.payload ?? "un expected error";
        }
      );
  },
});

export default userDetSlice.reducer;
export const {
  setUser,
  unSetUser,
  addLastPlayed,
  likeReciter,
  removeReciterLike,
  clearLikedReciters,
  addNewPlayList,
  addAudioToPlayList,
  editPlayList,
  deletePlayList,
  removeAudioFromPlayList,
} = userDetSlice.actions;
