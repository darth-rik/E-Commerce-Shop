import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin",
		email: "admin@abc.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},

	{
		name: "Rik",
		email: "rik@abc.com",
		password: bcrypt.hashSync("123456", 10),
	},

	{
		name: "Jane",
		email: "jane@abc.com",
		password: bcrypt.hashSync("123456", 10),
	},
];

export default users;
