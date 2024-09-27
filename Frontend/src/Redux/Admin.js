import { createSlice } from "@reduxjs/toolkit";

const AdminLoginSlice = createSlice({
  name: 'Adminlogin',
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

export const { LoginData, LogoutData } = AdminLoginSlice.actions;
export default AdminLoginSlice.reducer;