// db.js
const mysql = require('mysql2');

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'ecommerce'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.stack);
    throw err; // Force crash if connection fails
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;
