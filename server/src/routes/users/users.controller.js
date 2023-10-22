const { getAllUsers, addNewUser } = require("../../models/users.model");

async function httpGetAllUsers(req, res) {
	const users = await getAllUsers();
	res.status(200).json(users);
}

async function httpAddNewUser(req, res) {
	const { first_name, last_name, email, date_of_birth } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).json({
			error: "Missing required user property",
		});
	}

	// Create a new user object with required properties
	const user = { first_name, last_name, email };

	// Check if date_of_birth is provided
	if (date_of_birth) {
		const parsedDateOfBirth = new Date(date_of_birth);
		if (isNaN(parsedDateOfBirth)) {
			return res.status(400).json({
				error: "Invalid date of birth",
			});
		}
		user.date_of_birth = parsedDateOfBirth;
	}

	try {
		const insertedUser = await addNewUser(user);
		console.log(insertedUser);
		return res.status(201).json(insertedUser);
	} catch (error) {
		console.error("Error adding new user", error);
		return res.status(500).json({
			error: "An error occurred while adding a new user",
		});
	}
}

module.exports = { httpGetAllUsers, httpAddNewUser };
