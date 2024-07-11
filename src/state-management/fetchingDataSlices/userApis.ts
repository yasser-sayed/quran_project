import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../lib/types";
import axios from "axios";

export interface IUserApisInitialState {
  user: User | null;
  userLoading: boolean;
  userErr: null | string;
  postUser: null | User;
  postUserLoading: boolean;
  postUserErr: null | string;
}

const initialState: IUserApisInitialState = {
  user: null,
  userLoading: false,
  userErr: null,
  postUser: null,
  postUserLoading: false,
  postUserErr: null,
};

export const addUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "userApis/postUser",
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await axios({
        method: "post",
        url: "http://localhost:3000/users",
        data: user,
      });

      return data.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("json-server is down");
    }
  }
);

const userApisSlice = createSlice({
  name: "userApis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.postUserLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.postUserLoading = false;
        state.postUser = action.payload;
      })
      .addCase(
        addUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.postUserLoading = false;
          state.postUserErr = action.payload ?? "An unexpected error occurred";
        }
      );
  },
});

export default userApisSlice.reducer;
