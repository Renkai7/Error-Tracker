const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});

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

async function addNewUser() {
	try {
		const { first_name, last_name, email, date_of_birth } = req.body;
		const client = await pool.connect();
		const query =
			"INSERT INTO student (first_name, last_name, email, date_of_birth) VALUES ($1, $2, $3, $4::DATE) RETURNING *";
		const values = [fname, lname, email, dob];
		const result = await client.query(query, values);
		const insertedStudent = result.rows[0];
		client.release();

		return insertedStudent;
	} catch (error) {
		console.error("Error executing query", error);
		throw error;
	}
}

module.exports = { getAllUsers };
