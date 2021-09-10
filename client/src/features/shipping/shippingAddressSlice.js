import { createSlice } from "@reduxjs/toolkit";

const shippingAddressStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const shippingAddress = createSlice({
	name: "shippingAddress",
	initialState: {
		shippingAddress: shippingAddressStorage,
	},
	reducers: {
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;

			localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
		},
	},
	extraReducers: {},
});

export const { saveShippingAddress } = shippingAddress.actions;

export default shippingAddress.reducer;
