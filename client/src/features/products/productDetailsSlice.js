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

const productDetailsSlice = createSlice({
	name: "productDetails",
	initialState: {
		product: {},

		loading: false,

		error: "",
	},

	reducers: {},

	extraReducers: {
		[getProductDetails.pending]: (state) => {
			state.loading = true;
		},

		[getProductDetails.fulfilled]: (state, action) => {
			state.loading = false;
			state.product = action.payload;
		},
		[getProductDetails.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export default productDetailsSlice.reducer;
