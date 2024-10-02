import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/forgot-password', emailData); // Adjust API path as per your backend
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to send reset link');
    }
  }
);
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (formdata, { rejectWithValue }) => {
      try {
        console.log(formdata.token.token, formdata.password,formdata.confirmPassword)
        console.log(formdata)

        const response = await axios.put(`/api/v1/reset-password/${formdata.token.token}`,formdata, { headers: {'Content-Type': 'application/json' }})// Adjust API path as per your backend
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to send reset link');
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      //reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;
