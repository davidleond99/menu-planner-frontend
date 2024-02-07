import { createAsyncThunk } from "@reduxjs/toolkit";
import ingredientServices from "../../services";
import { ICreateIngredient, IGetIngredients } from "../../types";
import { showMsg } from "../../../../shared/redux/message";

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
  async (id: number, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await ingredientServices.getItemById<
        IGetIngredients,
        number
      >(id);
      return fulfillWithValue<IGetIngredients>(resp.data);
    } catch (error) {
      dispatch(
        showMsg({
          type: "success",
          msg: "Proveedor asignado",
        })
      );
      return rejectWithValue(error);
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
      const resp = await ingredientServices.createItem<IGetIngredients>(data);
      dispatch(
        showMsg({
          type: "success",
          msg: "Proveedor asignado",
        })
      );
      return fulfillWithValue(resp.data);
    } catch (error) {
      dispatch(
        showMsg({
          type: "success",
          msg: "Proveedor asignado",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateIngredient = createAsyncThunk(
  "patch/ingredient",
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
