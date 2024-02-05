export interface IIngredientState {
  ingredients: IGetIngredients[];
  loadedIngredients: boolean;
  loadingIngredients: boolean;
}

export interface IGetIngredients {
  id: number;
  name: string;
  category: string;
  unity: string;
}

export interface IIngredient {
  id: number;
  name: string;
  category: string;
  unity: string;
}

export interface ICreateIngredient {
  name: string;
  category: string;
  unity: string;
}
