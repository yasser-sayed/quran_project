import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../lib/types";
import axios from "axios";

export interface IUserDetInitialState {
  user: User | null;
  userLoading: boolean;
  userErr: null | string;
}

const initialState: IUserDetInitialState = {
  user: null,
  userLoading: false,
  userErr: null,
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
      if (axios.isAxiosError(err) && err.message)
        return rejectWithValue(err.message);
    }

    return rejectWithValue("un expected error");
  }
);

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
export const { setUser, unSetUser } = userDetSlice.actions;
