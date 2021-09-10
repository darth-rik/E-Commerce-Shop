import { createSlice } from "@reduxjs/toolkit";

const paymentMethodStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: "";

const paymentMethod = createSlice({
	name: "paymentMethod",
	initialState: {
		paymentMethod: paymentMethodStorage,
	},
	reducers: {
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;

			localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
		},
	},
	extraReducers: {},
});

export const { savePaymentMethod } = paymentMethod.actions;

export default paymentMethod.reducer;
