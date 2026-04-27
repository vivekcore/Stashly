import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Usertype {
  username: string;
}

const initialState: Usertype = {
  username: localStorage.getItem('username')||"",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username',state.username)
    },
    clearUsername: (state) => {
      localStorage.removeItem('username');
      state.username = "";
    },
  },
});

export const { setUsername, clearUsername } = UserSlice.actions;
export default UserSlice.reducer;
