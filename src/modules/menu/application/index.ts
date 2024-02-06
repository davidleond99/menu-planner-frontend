import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { extraReducers } from "./extraReducers";
import { RootState } from "../../../shared/store";
import { IMenuState } from "../types";

export * from "./asyncThunks";

const initialState: IMenuState = {
  menus: [],
  loadedMenus: false,
  loadingMenus: false,
};

const menusSlice = createSlice({
  name: "menu",
  initialState,
  reducers,
  extraReducers,
});

export const {
  setLoadingMenus,
  unsetLoadingMenus,
  setLoadedMenus,
  unsetLoadedMenus,
} = menusSlice.actions;

export const menusReducer = menusSlice.reducer;

export const menusSelector = (state: RootState) => state.menu;
