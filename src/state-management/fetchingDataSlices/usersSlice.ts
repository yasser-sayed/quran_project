import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../lib/types";

export interface IUsersInitialState {
  users: User[];
  usersLoading: boolean;
  usersErr: string | null;
}

const initialState: IUsersInitialState = {
  users: [],
  usersLoading: true,
  usersErr: null,
};

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/getUsers",
  async (_NU, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await axios({
        method: "get",
        url: "http://localhost:3000/users",
      });

      return data.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("un expected error");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersErr = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(
        getUsers.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.usersLoading = false;
          state.usersErr = action.payload ?? "An unexpected error occurred";
        }
      );
  },
});

export default usersSlice.reducer;
