const mySQL = require('mysql');

const chpConnection = mySQL.createConnection({
	debug: false,
	host: '127.0.0.1',
	port: '3306',
	user: 'dbarajas_cs355sp20',
	password: 'ba3255062',
	database: 'dbarajas_cs355sp20'
});

module.exports = chpConnection;
