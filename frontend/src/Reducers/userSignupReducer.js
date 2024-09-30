// src/features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const signupUser = createAsyncThunk('user/signup', async (userData) => {
    const response = await axios.post('/api/v1/register', userData);
    return response.data;  // Assume response contains success message and OTP info
});

export const verifyEmail = createAsyncThunk('user/verifyEmail', async ({ email, otp }) => {
    const response = await axios.post('/api/v1/verify', { email, otp });
    return response.data;  // Assume response contains success message
});

export const loginUser = createAsyncThunk('user/login', async (userData) => {
    const response = await axios.post('/api/v1/login', userData);
    return response.data;
});

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
        message: null,
        otpSent: false, // New state for OTP sent status
        emailVerified: false, // New state for email verification status
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        resetMessage: (state) => {
            state.message = null;
        },
        resetOtpSent: (state) => {
            state.otpSent = false;
        },
        resetEmailVerified: (state) => {
            state.emailVerified = false;
        },
    },
    extraReducers: (builder) => {
        // Signup user
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.message = action.payload.message;
                state.otpSent = true; // Set OTP sent status to true
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Verify Email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.emailVerified = true; // Email has been verified
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const { resetError, resetMessage, resetOtpSent, resetEmailVerified } = userSlice.actions;
export default userSlice.reducer;
