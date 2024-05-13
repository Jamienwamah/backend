const bcrypt = require("bcryptjs");
const pool = require('../../index');

// Function to hash passwords
async function hashPassword(password) {
    return bcrypt.hash(password, 8);
}

// Function to create a new user
async function createUser(email, password, firstName, lastName) {
    const hashedPassword = await hashPassword(password);
    const query = {
        text: 'INSERT INTO users(email, password, first_name, last_name) VALUES($1, $2, $3, $4)',
        values: [email, hashedPassword, firstName, lastName],
    };
    return pool.query(query);
}

// Export the createUser function
module.exports = { createUser };
