import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails = createAsyncThunk('product/fetchProductsDetails', async (id) => {
  try {
    const response = await axios.get(`/api/v1/product/${id}`); // Adjust the URL as necessary
    return response.data; // Return the product directly
  } catch (error) {
    // Throw a new error to be handled by the extraReducers
    throw new Error(error.response.data.message || 'Failed to fetch product');
  }
});


const initialState = {
  product: {},
  isLoading: false,
  error: null,
};

const ProductDetailsSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.product;
        state.message = action.payload.message;
        state.productCount = action.payload.productCount;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        
      });
  },
});

export default ProductDetailsSlice.reducer;
