const db = require('../db/db'); // Assuming you're using SQLite

// Add a transaction
exports.addTransaction = (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const query = 'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [type, category, amount, date, description], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

// Get all transactions
exports.getAllTransactions = (req, res) => {
    const query = 'SELECT * FROM transactions';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Get a transaction by ID
exports.getTransactionById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM transactions WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
};

// Update a transaction by ID
exports.updateTransaction = (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;
    const query = 'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?';
    db.run(query, [type, category, amount, date, description, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Transaction updated successfully' });
    });
};

// Delete a transaction by ID
exports.deleteTransaction = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM transactions WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Transaction deleted successfully' });
    });
};

// Get summary of transactions
exports.getSummary = (req, res) => {
    const query = `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
            (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
        FROM transactions
    `;
    db.get(query, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
};
