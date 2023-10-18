const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});

// show all users
async function getAllUsers() {
	try {
		const client = await pool.connect();
		const query = 'SELECT * FROM "user"';
		const result = await client.query(query);
		const users = result.rows;
		client.release();
		return users;
	} catch (error) {
		console.error("Error executing query", error);
		throw error;
	}
}

// add a new user
async function addNewUser(user) {
	try {
		const { first_name, last_name, email, date_of_birth } = user;
		const client = await pool.connect();
		const dateOfBirthClause = date_of_birth ? ", date_of_birth" : "";
		const dateOfBirthValue = date_of_birth ? ", $4::DATE" : "";
		const query = `
      INSERT INTO "user" (first_name, last_name, email${dateOfBirthClause})
      VALUES ($1, $2, $3${dateOfBirthValue})
      RETURNING *
    `;
		const values = [first_name, last_name, email];

		// Push date_of_birth to values array if it's provided
		if (date_of_birth) {
			values.push(date_of_birth);
		}
		const result = await client.query(query, values);
		const insertedUser = result.rows[0];
		client.release();

		return insertedUser;
	} catch (error) {
		console.error("Error executing query", error);
		throw error;
	}
}

module.exports = { getAllUsers, addNewUser };
