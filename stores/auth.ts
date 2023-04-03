import axios from "axios";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false
};

export type UserRegistrationCredentials = {
  firstName: string;
  lastNames: string;
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ firstName, lastNames, email, password }: UserRegistrationCredentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `/api/user/register`,
        { firstName, lastNames, email, password },
        config
      );
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      switch (action.type) {
        case 'PENDING':
          return {
            ...state,
            loading: true,
            error: null,
          };
        case 'FULFILLED':
          return {
            ...state,
            loading: false,
            success: true,
          };
        case 'REJECTED':
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        default:
          return state;
      };
    },
  },
});

export const authStore = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});
