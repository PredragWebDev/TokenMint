const { pool } = require("../mysql/connector");

exports.create = (user_id, token_id, token_type, status, callback) => {
	var sql = "INSERT INTO products ( user_id, token_id, token_type, status ) VALUES ("+user_id+", "+token_id+", "+token_type+", '"+status+"' )";
	pool.query(sql, callback);
}

exports.getById = (product_id, callback) => {
	pool.query("SELECT * FROM products WHERE id = "+ product_id, callback);
}

exports.list = (callback) => {
	pool.query("SELECT * FROM products", callback);
}

exports.removeAll = (callback) => {
	pool.query("DELETE FROM products", callback);
}

exports.update = (id, user_id, token_id, token_type, status, callback) => {
	pool.query(`UPDATE products SET user_id = ${user_id},  token_id = ${token_id}, token_type = ${token_type}, status = '${status}' WHERE id = ${id}`, callback);
}

exports.updateId = (id, token_id, callback) => {
	pool.query(`UPDATE products SET token_id = ${token_id} WHERE id = ${id}`, callback);
}

exports.updateStatus = (id, status, callback) => {
	pool.query(`UPDATE products SET status = '${status}' WHERE id = ${id}`, callback);
}

exports.remove = (id, callback) => {
	pool.query(`DELETE FROM products WHERE id = ${id}`, callback);
}