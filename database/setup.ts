/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

export async function setupDatabase() {
	// First connection without database to create it if needed
	const connection = await mysql.createConnection({
		host: MYSQL_HOST,
		user: MYSQL_USER,
		password: MYSQL_PASSWORD,
	});

	try {
		// Create database if it doesn't exist
		await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
		await connection.query(`USE ${MYSQL_DATABASE}`);

		// Read schema file
		const schemaPath = path.join(__dirname, 'schema.sql');
		const schema = fs.readFileSync(schemaPath, 'utf8');

		// Split and execute each statement
		const statements = schema
			.split(';')
			.filter(statement => statement.trim().length > 0);

		for (const statement of statements) await connection.query(statement);

		console.log('Database and tables created successfully');
	} catch (error) {
		console.error('Error setting up database:', error);
		throw error;
	} finally {
		await connection.end();
	}
}
