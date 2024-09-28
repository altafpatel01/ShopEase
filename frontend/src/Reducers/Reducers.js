import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page) => {
    try {
      const response = await axios.get(`/api/v1/products?page=${page}`); // Adjust the URL as necessary
      return response.data; // Return the products directly
    } catch (error) {
      // Throw a new error to be handled by the extraReducers
      throw new Error(
        error.response.data.message || "Failed to fetch products"
      );
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.message = action.payload.message;
        state.productCount = action.payload.productCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
