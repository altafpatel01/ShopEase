import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action to submit a review
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({productId, reviewData}) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // To send cookies with the request for authentication
      };
      const response = await axios.put(
        `/api/v1/products/${productId}/reviews`,
        reviewData,
        config
      );
      return response.data;
    } catch (error) {
    //   return rejectWithValue(error.response.data.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetReviewState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;

export default reviewSlice.reducer;
