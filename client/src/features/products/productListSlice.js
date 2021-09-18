import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "productList/getProducts",
  async ({ category, value, page }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        value
          ? `/api/products?category=${category}&search=${value}&page=${page}`
          : `/api/products?category=${category}&page=${page}`
      );
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

export const getTopProducts = createAsyncThunk(
  "productList/getTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("api/products/top");
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

const productListSlice = createSlice({
  name: "productList",
  initialState: {
    loading: false,
    products: {},
    topProducts: [],
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getTopProducts.pending]: (state) => {
      state.loading = true;
    },
    [getTopProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.topProducts = action.payload;
      state.error = "";
    },
    [getTopProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productListSlice.reducer;
