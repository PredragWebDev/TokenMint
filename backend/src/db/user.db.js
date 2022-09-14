const { pool } = require("../mysql/connector");

exports.create = (name, address, nonce, accessToken, callback) => {
	var sql = "INSERT INTO users ( name, address, nonce, accessToken ) VALUES ('"+name+"', '"+address+"', '"+nonce+"', '"+accessToken+"' )";
	pool.query(sql, callback);
}

exports.getById = (user_id, callback) => {
	pool.query("SELECT * FROM users WHERE id = "+ id, callback);
}

exports.getByAddress = (address, callback) => {
	pool.query(`SELECT * FROM users WHERE address = '${address}'`, callback);
}

exports.list = (callback) => {
	pool.query("SELECT * FROM users", callback);
}

exports.removeAll = (callback) => {
	pool.query("DELETE FROM users", callback);
}

exports.update = (user, callback) => {
	pool.query(`UPDATE users SET name = '${user.name}', address = '${user.address}', nonce = '${user.nonce}', accessToken = '${user.accessToken}' WHERE id = ${user.id}`, callback);
}

exports.remove = (id, callback) => {
	pool.query(`DELETE FROM users WHERE id=${id}`, callback);
}

exports.verify = (user, callback) => {
	pool.query(`SELECT * FROM users WHERE id = ${user.id} AND name = '${user.name}' AND address = '${user.address}' AND nonce = '${user.nonce}' `, callback);
}