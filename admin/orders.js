const db = require('./db');

// Order Management Module

/**
 * Get all orders
 */
function getAllOrders(callback) {
    const query = 'SELECT * FROM Orders';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

/**
 * Update order status
 */
function updateOrderStatus(orderId, status, callback) {
    const query = 'UPDATE Orders SET status = ? WHERE order_id = ?';
    db.query(query, [status, orderId], (err, results) => {
        if (err) {
            console.error('Error updating order status:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

/**
 * Delete an order by ID
 */
function deleteOrder(orderId, callback) {
    const query = 'DELETE FROM Orders WHERE order_id = ?';
    db.query(query, [orderId], (err, results) => {
        if (err) {
            console.error('Error deleting order:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports = { getAllOrders, updateOrderStatus, deleteOrder };