import { IIngredientState } from "../../types";

export const reducers = {
  setLoadingIngredients: (state: IIngredientState) => {
    state.loadingIngredients = true;
  },

  unsetLoadingIngredients: (state: IIngredientState) => {
    state.loadingIngredients = false;
  },

  setLoadedIngredients: (state: IIngredientState) => {
    state.loadedIngredients = true;
  },

  unsetLoadedIngredients: (state: IIngredientState) => {
    state.loadedIngredients = false;
  },
};
