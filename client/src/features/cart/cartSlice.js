import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk(
	"handleCart/addItems",
	async ({ productId, qty }) => {
		const { data } = await axios.get(`/api/products/${productId}`);

		const cartDetails = {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		};

		return cartDetails;
	}
);
const cartDetailsStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const handleCart = createSlice({
	name: "handleCart",
	initialState: {
		cartItems: cartDetailsStorage,
	},
	reducers: {
		removeItem: (state, action) => {
			state.cartItems.splice(action.payload, 1);
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
	},
	extraReducers: {
		[addItemsToCart.pending]: (state) => {},
		[addItemsToCart.fulfilled]: (state, action) => {
			const item = action.payload;
			const itemExists = state.cartItems.find(
				(cartItem) => cartItem.product === item.product
			);

			if (itemExists) {
				state.cartItems[state.cartItems.indexOf(itemExists)] = item;
			} else {
				state.cartItems.push(item);
			}

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
	},
});

export const { removeItem } = handleCart.actions;

export default handleCart.reducer;
