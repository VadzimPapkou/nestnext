import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/axiosClient";
import { IFriend } from "@/models/friend";

interface FriendsState {
  friends: IFriend[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface FetchFriendsArgs {
  userId: number;
}

const initialState: FriendsState = {
  friends: [],
  status: "idle",
  error: null,
};

export const fetchFriends = createAsyncThunk<IFriend[], FetchFriendsArgs>(
  "friends/fetchFriends",
  async ({userId}) => {
    const { data } = await axiosClient.get(`/users/${userId}/friends`);
    return data as IFriend[];
  },
);

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    resetFriendsState: (state) => {
      state.friends = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state: FriendsState) => {
        state.status = "loading";
      })
      .addCase(fetchFriends.fulfilled, (state: FriendsState, action: PayloadAction<IFriend[]>) => {
        state.status = "succeeded";
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state: FriendsState, action) => {
        state.status = "failed";
        state.error = action?.error?.message || null;
      });
  },
});

export const { resetFriendsState } = friendsSlice.actions;

export default friendsSlice.reducer;
