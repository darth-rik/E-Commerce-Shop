import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createProductReview = createAsyncThunk(
  "productList/createProductReview",
  async (
    { id, review: { rating, comment } },
    { getState, rejectWithValue }
  ) => {
    try {
      const {
        userAuth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
        config
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},

    loading: false,

    error: "",

    errorReview: "",

    success: false,
  },

  reducers: {},

  extraReducers: {
    [getProductDetails.pending]: (state) => {
      state.loading = true;
    },

    [getProductDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
      state.errorReview = "";
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [createProductReview.pending]: (state) => {
      state.loading = true;
      state.errorReview = "";
    },
    [createProductReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.errorReview = "";
    },
    [createProductReview.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.errorReview = action.payload;
    },
  },
});

export default productDetailsSlice.reducer;
