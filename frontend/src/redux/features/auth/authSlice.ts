import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_URL} from "@/config";
import {IUser} from "@/models/userToken";

interface AuthState {
    user: IUser | null;
}

const initialState: AuthState = {
  user: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = authSlice.actions;
export const authReducer = authSlice.reducer;
