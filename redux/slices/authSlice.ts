import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

type userState = {
    loading: boolean;
    userInfo: {
        names: string,
        lastNames: string,
        email: string,
    } | null;
    userToken: string | null;
    error: any | null;
    success: boolean;
};

type UserRegistrationCredentials = {
    firstName: string;
    lastNames: string;
    email: string;
    password: string;
};

const initialState: userState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ firstName, lastNames, email, password }: UserRegistrationCredentials, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const token = await axios.post(
                `/api/user/register`,
                { firstName, lastNames, email, password },
                config
            );

            localStorage.setItem("token", token.data);

            return token.data;
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
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state, _) => {
            return { ...state, loading: true }
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const userInfo = jwtDecode<userState["userInfo"]>(action.payload);

                return {
                    ...state,
                    token: action.payload,
                    userInfo,
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