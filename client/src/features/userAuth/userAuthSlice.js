import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
	"userAuth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(
				"/api/users/login",
				{ email, password },
				config
			);
			localStorage.setItem("userInfo", JSON.stringify(data));

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

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const userAuth = createSlice({
	name: "userAuth",
	initialState: {
		loading: false,
		userInfo: userInfoFromStorage,
		error: "",
	},
	reducers: {},
	extraReducers: {
		[userLogin.pending]: (state) => {
			state.loading = true;
		},

		[userLogin.fulfilled]: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
		},

		[userLogin.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export default userAuth.reducer;
