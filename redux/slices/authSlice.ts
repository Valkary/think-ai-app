import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export type UserRegistrationCredentials = {
  displayName: string;
  password: string;
  confirmPwd: string;
  email: string;
};

type initialState = {
  loading: boolean;
  userInfo: {
    uid: string,
    email: string | null;
    password: string | null;
  } | null;
  error: any;
  success: boolean;
};

const initialState: initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, displayName }: { email: string, password: string, displayName: string }, { rejectWithValue }) => {

    try {
      await createUserWithEmailAndPassword(auth, email, password).catch(err => {
        rejectWithValue(err);
      });

      if (!auth.currentUser) {
        throw new Error("idk");
      }
      await updateProfile(auth.currentUser, { displayName }).catch(err => {
        rejectWithValue(err);
      });

      {
        const { uid, email, displayName } = auth.currentUser;
        return { uid, email, displayName };
      }
    } catch (error: any) {
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, _) => {
      return { ...state, loading: true }
    });

    // WARN: there is a typescript error here but I don't know how to solve it 
    // @ts-ignore
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          userInfo: action.payload,
          success: true
        }
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload
      }
    });
  }
});

export default authSlice.reducer;
