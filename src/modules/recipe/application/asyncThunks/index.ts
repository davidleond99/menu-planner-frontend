import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateRecipe, IGetRecipes } from "../../types";
import recipeService from "../../services";

export const getRecipes = createAsyncThunk(
  "get/recipe",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await recipeService.getItems<IGetRecipes[]>();
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "get/recipeById",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await recipeService.getItemById<IGetRecipes, number>(id);
      return fulfillWithValue<IGetRecipes>(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createRecipes = createAsyncThunk(
  "post/recipes",
  async (data: ICreateRecipe, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await recipeService.createItem<IGetRecipes>(data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "put/recipe",
  async (
    { id, data }: { id: number; data: ICreateRecipe },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const resp = await recipeService.updateItem<IGetRecipes, number>(
        id,
        data
      );
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "delete/recipe",
  async (recipeId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await recipeService.delete(recipeId);
      return fulfillWithValue(resp);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);
