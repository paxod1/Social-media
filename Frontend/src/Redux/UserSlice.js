import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: 'userlogin',
  initialState: {
    LoginInfo: []
  },
  reducers: {
    LoginData: (state, action) => {
      state.LoginInfo.push(action.payload);
    },
    LogoutData: (state, action) => {
      state.LoginInfo = [];
    }
  }
});

export const { LoginData, LogoutData } = LoginSlice.actions;
export default LoginSlice.reducer;
