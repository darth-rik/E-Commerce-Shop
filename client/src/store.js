import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailsReducer from "./features/products/productDetailsSlice";

const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
	},
});

export default store;
