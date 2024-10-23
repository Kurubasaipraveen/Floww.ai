const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

db.serialize(() => {
    // Create 'transactions' table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        )
    `, (err) => {
        if (err) {
            console.error("Error creating 'transactions' table:", err.message);
        } else {
            console.log("'transactions' table created or already exists.");
        }
    });

    // Create 'categories' table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating 'categories' table:", err.message);
        } else {
            console.log("'categories' table created or already exists.");
        }
    });
});

// Export the database object for use in other modules
module.exports = db;
