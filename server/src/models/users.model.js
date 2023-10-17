async function getAllUsers() {
	try {
		const client = await pool.connect();
		const query = "SELECT * FROM users";
		const result = await client.query(query);
		const users = result.rows;
		client.release();
		return users;
	} catch (error) {
		console.error("Error executing query", error);
		throw error;
	}
}

module.exports = { getAllUsers };
