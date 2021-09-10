import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrders = createAsyncThunk(
  "orders/createOrders",
  async (order, { rejectWithValue, getState }) => {
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

      const { data } = await axios.post("/api/orders", order, config);

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

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (id, { rejectWithValue, getState }) => {
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

      const { data } = await axios.get(`/api/orders/${id}`, config);

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

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    success: false,
    orderItems: {},
    error: "",
    orderDetails: null,
  },

  reducers: {},

  extraReducers: {
    [createOrders.pending]: (state) => {
      state.loading = true;
    },
    [createOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orderItems = action.payload;
    },
    [createOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getOrders.pending]: (state) => {
      state.loading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.loading = false;

      state.orderDetails = action.payload;
    },
    [getOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default ordersSlice.reducer;
