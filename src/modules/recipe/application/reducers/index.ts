import { IRecipeState } from "../../types";

export const reducers = {
  setLoadingRecipes: (state: IRecipeState) => {
    state.loadingRecipes = true;
  },

  unsetLoadingRecipes: (state: IRecipeState) => {
    state.loadingRecipes = false;
  },

  setLoadedRecipes: (state: IRecipeState) => {
    state.loadedRecipes = true;
  },

  unsetLoadedRecipes: (state: IRecipeState) => {
    state.loadedRecipes = false;
  },
};
