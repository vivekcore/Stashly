import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isOpen: boolean;
}

const initialState: UIState = {
  isOpen: false,
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
  },
});

export const { toggle, setOpen } = uiSlice.actions;
export default uiSlice.reducer;