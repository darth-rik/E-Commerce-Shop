import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";

const store = configureStore({
	reducer: {
		productList: productListReducer,
	},
});

export default store;
