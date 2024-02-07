import { createAsyncThunk } from "@reduxjs/toolkit";
import ingredientServices from "../../services";
import { ICreateIngredient, IGetIngredients } from "../../types";

export const getIngredients = createAsyncThunk(
  "get/ingredients",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await ingredientServices.getItems<IGetIngredients[]>();
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const getIngredientById = createAsyncThunk(
  "get/ingredientId",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await ingredientServices.getItemById<
        IGetIngredients,
        number
      >(id);
      return fulfillWithValue<IGetIngredients>(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createIngredient = createAsyncThunk(
  "post/ingredient",
  async (data: ICreateIngredient, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await ingredientServices.createItem<IGetIngredients>(data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateIngredient = createAsyncThunk(
  "put/ingredient",
  async (
    { id, data }: { id: number; data: ICreateIngredient },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const resp = await ingredientServices.updateItem<IGetIngredients, number>(
        id,
        data
      );
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "delete/ingredient",
  async (ingredientId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await ingredientServices.delete(`${ingredientId}`);
      return fulfillWithValue(resp);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);
