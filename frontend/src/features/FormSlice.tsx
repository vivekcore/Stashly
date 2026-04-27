import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isOpen: boolean;
  refreshKey: number;
}

const initialState: UIState = {
  isOpen: false,
  refreshKey: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    contentSaved: (state) => {
      state.refreshKey += 1;
    },
  },
});

export const { toggle, setOpen, contentSaved } = uiSlice.actions;
export default uiSlice.reducer;
