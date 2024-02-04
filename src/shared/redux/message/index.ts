import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, IShowMessage } from '../../../modules/app/types';
import { RootState } from '../../store';


const initialState: IMessage = {
  detail: '',
  life: 2500,
  severity: 'success',
  summary: '',
  show: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state: IMessage, action: PayloadAction<IShowMessage>) => {
      return {
        ...state,
        ...action.payload,
        summary: action.payload.summary ? action.payload.summary : 'error',
        show: true,
      };
    },
    hideMessage: (state: IMessage) => {
      return {
        ...state,
        show: false,
      };
    },
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
export const messageSelector = (state: RootState): IMessage => state.message;
export default messageReducer;
