export interface IRecipeState {
  recipes: IGetRecipes[];
  loadedRecipes: boolean;
  loadingRecipes: boolean;
}

export interface IGetRecipes {
  id: number;
  name: string;
  instructions: string;
}

export interface IRecipe {
  id: number;
  name: string;
  instructions: string;
}

export interface ICreateRecipe {
  name: string;
  instructions: string;
}
