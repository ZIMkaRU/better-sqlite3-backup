'use strict';

const Database = require('better-sqlite3')

const db = new Database('test.db')

db.exec(`
	CREATE TABLE IF NOT EXISTS tbl (a, b, c);
	INSERT INTO tbl (a, b, c) VALUES (1, 2, 3);
	INSERT INTO tbl (a, b, c) VALUES (10, 20, 30);
	INSERT INTO tbl (a, b, c) VALUES (100, 200, 300);
`)

console.log('starting first backup...')

db.backup('backup-test.db')
	.then(() => {
		console.log('first backup complete')
	})
	.catch((err) => {
		console.log('first backup failed:', err)
	})

setTimeout(() => {
	console.log('starting second backup...')

	db.backup('backup-test.db')
    .then(() => {
			console.log('second backup complete')
		})
		.catch((err) => {
			console.log('second backup failed:', err)
		})
}, 5000)
