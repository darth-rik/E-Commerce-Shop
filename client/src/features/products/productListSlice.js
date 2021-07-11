import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadProducts = createAsyncThunk(
	"productList/getProducts",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get("/api/products");
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
		products: [],
		error: "",
	},
	reducers: {},
	extraReducers: {
		[loadProducts.pending]: (state) => {
			state.loading = true;
		},
		[loadProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.products = action.payload;
		},
		[loadProducts.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export default productListSlice.reducer;
