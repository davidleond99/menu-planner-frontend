import { IMenuState } from "../../types";

export const reducers = {
  setLoadingMenus: (state: IMenuState) => {
    state.loadingMenus = true;
  },

  unsetLoadingMenus: (state: IMenuState) => {
    state.loadingMenus = false;
  },

  setLoadedMenus: (state: IMenuState) => {
    state.loadedMenus = true;
  },

  unsetLoadedMenus: (state: IMenuState) => {
    state.loadedMenus = false;
  },
};
