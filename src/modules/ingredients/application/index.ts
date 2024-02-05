import { createSlice } from "@reduxjs/toolkit";
import { IIngredientState } from "../types";
import { reducers } from "./reducers";
import { extraReducers } from "./extraReducers";
import { RootState } from "../../../shared/store";

export * from "./asyncThunks";

const initialState: IIngredientState = {
  ingredients: [],
  loadedIngredients: false,
  loadingIngredients: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers,
  extraReducers,
});

export const {
  setLoadingIngredients,
  unsetLoadingIngredients,
  setLoadedIngredients,
  unsetLoadedIngredients,
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;

export const ingredientsSelector = (state: RootState) => state.ingredients;
