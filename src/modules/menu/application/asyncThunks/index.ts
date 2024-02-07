import { createAsyncThunk } from "@reduxjs/toolkit";
import { menuService, menuServiceByUser } from "../../services";
import { IGetMenus, ICreateMenu } from "../../types";

export const getMenus = createAsyncThunk(
  "get/menu",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await menuService.getItems<IGetMenus[]>();
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const getMenuById = createAsyncThunk(
  "get/menuByUserId",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await menuService.getItemById<IGetMenus, number>(id);
      return fulfillWithValue<IGetMenus>(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMenuByUserId = createAsyncThunk(
  "get/menuById",
  async (userId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await menuServiceByUser.getItemById<IGetMenus[], number>(
        userId
      );
      return fulfillWithValue<IGetMenus[]>(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createMenus = createAsyncThunk(
  "post/menu",
  async (data: ICreateMenu, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await menuService.createItem<IGetMenus>(data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMenu = createAsyncThunk(
  "patch/menu",
  async (
    { id, data }: { id: number; data: ICreateMenu },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const resp = await menuService.updateItem<IGetMenus, number>(id, data);
      return fulfillWithValue(resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "delete/menu",
  async (menuId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const resp = await menuService.delete(`${menuId}`);
      return fulfillWithValue(resp);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);
