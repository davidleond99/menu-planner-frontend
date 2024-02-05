import { createAsyncThunk } from "@reduxjs/toolkit";
import ingredientServices from "../../services";
import { ICreateIngredient, IGetIngredients } from "../../types";
import { setLoadingIngredients, unsetLoadingIngredients } from "..";

export const getIngredients = createAsyncThunk(
  "get/ingredients",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    // const state: RootState = getState();
    try {
      // if (!state.ingredients.loadingIngredients) dispatch(setLoadingIngredients());
      const resp = await ingredientServices.getItems<IGetIngredients[]>();
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue([]);
    } finally {
      // dispatch(unsetLoadingIngredients());
    }
  }
);

export const createIngredient = createAsyncThunk(
  "post/ingredients",
  async (
    data: ICreateIngredient,
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      dispatch(setLoadingIngredients());
      const resp = await ingredientServices.createItem<IGetIngredients>(data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(unsetLoadingIngredients());
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "delete/ingredient",
  async (ingredientId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      // dispatch(setdeleteServicesExtras());
      const resp = await ingredientServices.delete(`${ingredientId}`);
      return fulfillWithValue(resp);
    } catch (error) {
      return rejectWithValue([]);
    } finally {
      // dispatch(unsetdeleteServicesExtras());
    }
  }
);
