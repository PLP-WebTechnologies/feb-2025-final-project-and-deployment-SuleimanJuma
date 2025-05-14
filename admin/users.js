const db = require('./db');

// User Management Module

/**
 * Get all users
 */
function getAllUsers(callback) {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

/**
 * Add a new user
 */
function addUser(user, callback) {
    const query = 'INSERT INTO Users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)';
    const values = [user.name, user.email, user.password, user.address, user.phone];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error adding user:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

/**
 * Delete a user by ID
 */
function deleteUser(userId, callback) {
    const query = 'DELETE FROM Users WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports = { getAllUsers, addUser, deleteUser };