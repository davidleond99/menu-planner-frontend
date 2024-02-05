import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateRecipe, IGetRecipes } from "../../types";
import recipeService from "../../services";

export const getRecipes = createAsyncThunk(
  "get/recipe",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    // const state: RootState = getState();
    try {
      // if (!state.ingredients.loadingIngredients) dispatch(setLoadingIngredients());
      const resp = await recipeService.getItems<IGetRecipes[]>();
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue([]);
    } finally {
      // dispatch(unsetLoadingIngredients());
    }
  }
);

export const createRecipes = createAsyncThunk(
  "post/recipess",
  async (data: ICreateRecipe, { fulfillWithValue, rejectWithValue }) => {
    try {
      // dispatch(setLoadingOccupations());
      const resp = await recipeService.createItem<IGetRecipes>(data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      // dispatch(unsetLoadingOccupations());
    }
  }
);

export const deleteRecipes = createAsyncThunk(
  "delete/recipes",
  async (recipesId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      // dispatch(setdeleteServicesExtras());
      const resp = await recipeService.delete(`${recipesId}`);
      return fulfillWithValue(resp);
    } catch (error) {
      return rejectWithValue([]);
    } finally {
      // dispatch(unsetdeleteServicesExtras());
    }
  }
);
