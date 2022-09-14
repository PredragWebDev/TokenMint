const mysql = require('mysql')

exports.pool = mysql.createPool({
	connectionLimit : 25,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})