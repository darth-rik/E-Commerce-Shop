import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailsReducer from "./features/products/productDetailsSlice";
import cartReducer from "./features/cart/cartSlice";
import userAuthReducer from "./features/userAuth/userAuthSlice";
import shippingAddressReducer from "./features/shipping/shippingAddressSlice";
import paymentMethodReducer from "./features/paymentMethod/paymentMethodSlice";
import ordersReducer from "./features/orderItems/ordersSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userAuth: userAuthReducer,
    shipping: shippingAddressReducer,
    payment: paymentMethodReducer,
    orders: ordersReducer,
  },
});

export default store;
