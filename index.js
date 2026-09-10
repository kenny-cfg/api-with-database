const express = require('express');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'social',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

const api = express();
const port = 3000;
api.use(express.json());

api.listen(port, () => {
  console.log(`Listening on port ${port}`);
})