import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/order/${orderId}`,{ withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (orderId, { rejectWithValue }) => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/orders/${orderId}`,{ withCredentials: true });
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

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
      })

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading = false;
        state.order = null; // Clear the order details after deletion
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderDetailsSlice.reducer;
