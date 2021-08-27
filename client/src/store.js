import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailsReducer from "./features/products/productDetailsSlice";
import cartReducer from "./features/cart/cartSlice";
import userAuthReducer from "./features/userAuth/userAuthSlice";

const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
		cart: cartReducer,
		userAuth: userAuthReducer,
	},
});

export default store;
