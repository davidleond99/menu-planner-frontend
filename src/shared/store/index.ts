/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../../modules/auth/redux";
import { ingredientsReducer } from "../../modules/ingredients/application";
import { recipesReducer } from "../../modules/recipe/application";
import { menusReducer } from "../../modules/menu/application";
import { appReducer } from "../redux/message";


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  ingredients: ingredientsReducer,
  recipe: recipesReducer,
  menu: menusReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = (): ThunkDispatch<any, any, any> =>
  useDispatch<AppDispatch>();
export default store;
