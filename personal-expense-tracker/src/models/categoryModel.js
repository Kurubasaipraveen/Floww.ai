const db = require('../db/db');

const Category = {
    create: (category, callback) => {
        db.run(`INSERT INTO categories (name, type) VALUES (?, ?)`, [category.name, category.type], function (err) {
            callback(err, { id: this.lastID });
        });
    },
    getAll: (callback) => {
        db.all(`SELECT * FROM categories`, callback);
    },
};

module.exports = Category;
