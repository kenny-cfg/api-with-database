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
});

const api = express();
const port = 3000;
api.use(express.json());

api.get('/user', async (req, res) => {
  const [rows] = await pool.promise().query('select * from users');
  const result = rows.map(row => ({
    name: row.name,
    email: row.email,
    age: row.age
  }));
  res.json(result);
})

api.listen(port, () => {
  console.log(`Listening on port ${port}`);
})