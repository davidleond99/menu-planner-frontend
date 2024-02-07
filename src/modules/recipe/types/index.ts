import { IIngredient } from "../../ingredients/types";

export interface IRecipeState {
  recipes: IGetRecipes[];
  loadedRecipes: boolean;
  loadingRecipes: boolean;
}

export interface IGetRecipes {
  id: number;
  name: string;
  instructions: string;
  ingredients: IIngredient[];
}

export interface IRecipe {
  id: number;
  name: string;
  instructions: string;
  ingredientsId: number[];
}
export interface IRecipeAll {
  id: number;
  name: string;
  instructions: string;
  ingredients: IIngredient[];
}

export interface ICreateRecipe {
  id?: number;
  name: string;
  instructions: string;
  ingredientsId: number[];
}
