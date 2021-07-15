import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = {
				id: decoded.id,
			};
			next();
		} catch (error) {
			res.status(401).json({
				message: "Not authorized",
			});
		}
	}

	if (!token) {
		res.status(401).json({
			message: "No token found. Cannot authenticate",
		});
	}
};
