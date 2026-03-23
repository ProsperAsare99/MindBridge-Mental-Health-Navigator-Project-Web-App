const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to the database.');
    const res = await client.query('SELECT NOW()');
    console.log('Current Time:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
}

testConnection();
