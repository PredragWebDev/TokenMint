const { pool } = require("../mysql/connector");

exports.create = (name, description, image, exturnal_url, callback) => {
	var sql = "INSERT INTO erc721s ( name, description, image, exturnal_url ) VALUES ('"+name+"', '"+description+"', '"+image+"', '"+exturnal_url+"')";
	pool.query(sql, callback);
}

exports.get = (token_id, callback) => {
	pool.query("SELECT * FROM erc721s WHERE id = "+ token_id, callback);
}