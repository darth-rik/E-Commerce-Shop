import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import token from "../utils/token.js";

export const authUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.json({
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: token(user._id),
			});
		} else {
			res.status(401).json({
				message: "Invalid email or password",
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (user) {
			res.json({
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(401).json({
				message: "No user found",
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

export const updateUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: token(updatedUser._id),
			});
		} else {
			res.status(401).json({
				message: "No user found",
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400).json({ message: "User already exists" });
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		if (user) {
			res.status(201).json({
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: token(user._id),
			});
		} else {
			res.status(400).json({
				message: "Invalid data",
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};
