import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearchProducts = createAsyncThunk('product/fetchSearchProducts', async (keyword) => {
  try {
    const response = await axios.get(`/api/v1/products?keyword=${keyword}`); // Adjust the URL as necessary
    return response.data; // Return the product directly
  } catch (error) {
    // Throw a new error to be handled by the extraReducers
    throw new Error(error.response.data.message || 'Failed to fetch product');
  }
});


const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const searchProductSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.message = action.payload.message;
        state.productCount = action.payload.productCount;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        
      });
  },
});

export default searchProductSlice.reducer;
