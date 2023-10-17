const { getAllUsers } = require("../../models/users.model");

async function httpGetAllUsers(req, res) {
	const users = await getAllUsers();
	res.status(200).json(users);
}

module.exports = { httpGetAllUsers };
