import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IRecipeState } from "../../types";
import { getRecipes, createRecipes } from "../asyncThunks";

export const extraReducers = (
  builder: ActionReducerMapBuilder<IRecipeState>
) => {
  builder.addCase(getRecipes.fulfilled, (state, action) => {
    state.recipes = action.payload;
    state.loadedRecipes = true;
  });
  builder.addCase(getRecipes.rejected, (state) => {
    return {
      ...state,
      Recipes: [],
      loadedRecipes: false,
    };
  });
  builder.addCase(createRecipes.fulfilled, (state, action) => {
    state.recipes = [...state.recipes, action.payload];
    state.loadedRecipes = true;
  });
  builder.addCase(createRecipes.rejected, (state) => {
    return {
      ...state,
      Recipes: [],
      loadedRecipes: false,
    };
  });
};
