/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse, IAuthRequest, User, ICreateUser } from "../types";
import authServices, { userService } from "../services";
import { RootState } from "../../../shared/store";

interface IAuthState {
  error: any;
  loading: boolean;
  user: IAuthResponse | null;
}

const initialState: IAuthState = {
  error: null,
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, payload: PayloadAction<IAuthResponse | null>) => {
      state.user = payload.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = null;
      state.error = action?.payload?.message;
    });
  },
});

export const { logout, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState): IAuthState => state.auth;
export default authReducer;

export const loginUser = createAsyncThunk(
  "users/login",
  async (input: IAuthRequest, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await authServices.login(input);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data));
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(undefined);
      }
    } catch (err: any) {
      return rejectWithValue(undefined);
    }
  }
);

export const createUser = createAsyncThunk(
  "post/user",
  async (data: ICreateUser, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await userService.createItem<User>(data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
