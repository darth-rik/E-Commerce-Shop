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

export const userRegister = createAsyncThunk(
	"userAuth/login",
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(
				"/api/users",
				{ name, email, password },
				config
			);

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
	reducers: {
		userLogout: (state) => {
			localStorage.removeItem("userInfo");
			state.userInfo = null;
		},
	},
	extraReducers: {
		[userLogin.pending]: (state) => {
			state.loading = true;
			state.error = "";
		},

		[userLogin.fulfilled]: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.error = "";
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
		},

		[userLogin.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[userRegister.pending]: (state) => {
			state.loading = true;
			state.error = "";
		},

		[userRegister.fulfilled]: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.error = "";
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
		},

		[userRegister.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { userLogout } = userAuth.actions;

export default userAuth.reducer;
