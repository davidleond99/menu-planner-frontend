import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IIngredientState } from "../../types";
import { createIngredient, getIngredients } from "..";

export const extraReducers = (
  builder: ActionReducerMapBuilder<IIngredientState>
) => {
  builder.addCase(getIngredients.fulfilled, (state, action) => {
    state.ingredients = action.payload;
    state.loadedIngredients = true;
  });
  builder.addCase(getIngredients.rejected, (state) => {
    return {
      ...state,
      ingredients: [],
      loadedIngredients: false,
    };
  });
  builder.addCase(createIngredient.fulfilled, (state, action) => {
    state.ingredients = [...state.ingredients, action.payload];
    state.loadedIngredients = true;
  });
  builder.addCase(createIngredient.rejected, (state) => {
    return {
      ...state,
      ingredients: [],
      loadedIngredients: false,
    };
  });
};
