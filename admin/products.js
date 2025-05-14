const db = require('./db');

// Product Management Module

/**
 * Get all products
 */
function getAllProducts(callback) {
    const query = 'SELECT * FROM Products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

/**
 * Add a new product
 */
function addProduct(product, callback) {
    const query = 'INSERT INTO Products (name, description, price, image, category_id) VALUES (?, ?, ?, ?, ?)';
    const values = [product.name, product.description, product.price, product.image, product.category_id];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error adding product:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

/**
 * Delete a product by ID
 */
function deleteProduct(productId, callback) {
    const query = 'DELETE FROM Products WHERE product_id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error deleting product:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports = { getAllProducts, addProduct, deleteProduct };