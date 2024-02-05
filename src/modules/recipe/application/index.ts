import { createSlice } from "@reduxjs/toolkit";
import { IRecipeState } from "../types";
import { reducers } from "./reducers";
import { extraReducers } from "./extraReducers";
import { RootState } from "../../../shared/store";

export * from "./asyncThunks";

const initialState: IRecipeState = {
  recipes: [],
  loadedRecipes: false,
  loadingRecipes: false,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers,
  extraReducers,
});

export const {
  setLoadingRecipes,
  unsetLoadingRecipes,
  setLoadedRecipes,
  unsetLoadedRecipes,
} = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;

export const recipesSelector = (state: RootState) => state.recipe;
