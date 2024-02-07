import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IMenuState } from "../../types";
import { getMenus, createMenus } from "../asyncThunks";

export const extraReducers = (builder: ActionReducerMapBuilder<IMenuState>) => {
  builder.addCase(getMenus.fulfilled, (state, action) => {
    state.menus = action.payload;
    state.loadedMenus = true;
  });
  builder.addCase(getMenus.rejected, (state) => {
    return {
      ...state,
      menus: [],
      loadedMenus: false,
    };
  });
  builder.addCase(createMenus.fulfilled, (state, action) => {
    state.menus = [...state.menus, action.payload];
    state.loadedMenus = true;
  });
  builder.addCase(createMenus.rejected, (state) => {
    return {
      ...state,
      menus: [],
      loadedMenus: false,
    };
  });
};
