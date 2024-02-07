import { createSlice } from '@reduxjs/toolkit';
import { IAppState } from '../../interfaces';
import { RootState } from '../../store';
import { reducers } from '../reducers';



const initialState: IAppState = {
  loading: false,
  lang: localStorage.getItem('lang') || 'en',
  showMsg: false,
  typeMsg: 'info',
  message: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const { showLoading, hideLoading, changeLang, hideMsg, showMsg } =
  appSlice.actions;

export const appReducer = appSlice.reducer;

export const appSelector = (state: RootState) => state.app;
