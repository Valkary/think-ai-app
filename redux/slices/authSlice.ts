import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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
        return rejectWithValue(err);
      });

      if (!auth.currentUser) {
        return rejectWithValue({ error: "auth_error" });
      }

      await updateProfile(auth.currentUser, { displayName }).catch(err => {
        return rejectWithValue(err);
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).catch(err => {
        return rejectWithValue(err);
      })

      if (!auth.currentUser) {
        return rejectWithValue(0);
      }

      {
        const { uid, email, displayName } = auth.currentUser;
        return { uid, email, displayName };
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

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

    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload
      }
    });

    builder.addCase(loginUser.pending, (state, _) => {
      return {
        ...state,
        loading: true
      }
    });

    // @ts-ignore
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        userInfo: action.payload
      }
    });
  }
});

export default authSlice.reducer;
