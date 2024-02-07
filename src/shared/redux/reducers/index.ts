import { PayloadAction } from '@reduxjs/toolkit';
import { IAppState, IShowMsg } from '../../interfaces';

export const reducers = {
  showLoading: (state: IAppState) => {
    state.loading = true;
  },
  hideLoading: (state: IAppState) => {
    state.loading = false;
  },
  showMsg: (state: IAppState, action: PayloadAction<IShowMsg>) => {
    state.message = action.payload.msg || '';
    state.typeMsg = action.payload.type || 'info';
    state.showMsg = true;
  },
  hideMsg: (state: IAppState) => {
    state.showMsg = false;
    state.message = '';
  },
  changeLang: (state: IAppState, action: PayloadAction<'en' | 'es'>) => {
    state.lang = action.payload;
  },
};
