import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/v1/order/${orderId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderDetailsSlice.reducer;
