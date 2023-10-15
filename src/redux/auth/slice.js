import toast from 'react-hot-toast';
import { login, logout, refreshUser, register } from './operations';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, () => {
        toast.error('There is no user with credentials like that.');
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      }),
});

export const authReducer = authSlice.reducer;
