// src/features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
// export const signupUser = createAsyncThunk('user/signup', async (userData) => {
//     const response = await axios.post('/api/v1/register', userData);
//     return response.data;  // Assume response contains success message and OTP info
// });
export const signupUser = createAsyncThunk(
    'user/signup',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/v1/register', userData);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        } else {
          return rejectWithValue({ message: err.message });
        }
      }
    }
  );
  
  export const loadUser = createAsyncThunk(
    'user/loadUser',
    async () => {
      try {
        const response = await axios.get('/api/v1/me',);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return (err.response.data);
        } else {
          return ({ message: err.message });
        }
      }
    }
  );


  export const logout = createAsyncThunk(
    'user/logout',
    async () => {
      try {
        const response = await axios.get('/api/v1/logout',);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return (err.response.data);
        } else {
          return ({ message: err.message });
        }
      }
    }
  );
  
  export const resendOtp = createAsyncThunk(
    'user/resendOtp',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/v1/resendOtp', userData);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        } else {
          return rejectWithValue({ message: err.message });
        }
      }
    }
  );





// export const verifyEmail = createAsyncThunk('user/verifyEmail', async ({ email, otp }) => {
//     const response = await axios.post('/api/v1/verify', { email, otp });
//     return response.data;  // Assume response contains success message
// });
export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async ({ email, otp }, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/v1/verify', { email, otp });
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        } else {
          return rejectWithValue({ message: err.message });
        }
      }
    }
  );

// export const loginUser = createAsyncThunk('user/login', async (userData) => {
//     const response = await axios.post('/api/v1/login', userData);
//     return response.data;
// });
// Import rejectWithValue in your thunk
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/v1/login', userData);
        return response.data;
      } catch (err) {
        // Check if the error response exists and has data
        if (err.response && err.response.data) {
          // Return the error message from the server
          return rejectWithValue(err.response.data);
        } else {
          // Return a generic error message
          return rejectWithValue({ message: err.message });
        }
      }
    }
  );
  
// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
        isAuthenticated:false,
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
                // state.userInfo = action.payload.user;
                // state.message = action.payload.message;
                state.otpSent = true; // Set OTP sent status to true
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            //token authentication
            
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.message = action.payload;
                state.isAuthenticated=action.payload.success
                // state.otpSent = true; // Set OTP sent status to true
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.isAuthenticated=false
            })

            //logOut
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = null;
                state.message = action.payload;
                state.isAuthenticated=false
                // state.otpSent = true; // Set OTP sent status to true
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.isAuthenticated=action.payload.success
            })



            //resendOtp
            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.loading = false;
                // state.userInfo = action.payload.user;
                // state.message = action.payload.message;
                state.otpSent = true; // Set OTP sent status to true
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Verify Email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user
                state.emailVerified = true; // Email has been verified
                state.message = action.payload.message;
                state.isAuthenticated=true
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
                state.isAuthenticated=true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message  || 'Login failed.';
                state.isAuthenticated=false;
            });
    },
});

// Export actions and reducer
export const { resetError, resetMessage, resetOtpSent, resetEmailVerified } = userSlice.actions;
export default userSlice.reducer;
