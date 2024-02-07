import { IRecipeAll } from "../../recipe/types";

export interface IMenuState {
  menus: IGetMenus[];
  loadedMenus: boolean;
  loadingMenus: boolean;
}

export interface IGetMenus {
  id: number;
  userId: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  recipes: IRecipeAll[];
}

export interface IGetMenusAll {
  id: number;
  userId: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  recipes: IRecipeAll[];
}

export interface IMenu {
  id: number;
  userId: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  recipesId: number[];
}

export interface ICreateMenu {
  id?: number;
  userId: number;
  name: string;
  dateStart: string;
  recipesId: number[];
}
