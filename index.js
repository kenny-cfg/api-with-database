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
    id: row.id,
    name: row.name,
    email: row.email,
    age: row.age
  }));
  res.json(result);
})

api.post('/user', async (req, res) => {
  const json = req.body;
  await pool.promise()
    .query('insert into users (name, email, age) values (?, ?, ?)', [json.name, json.email, json.age]);
  res.status(201).send();
})

api.put('/user/:id', async (req, res) => {
  const json = req.body;
  const id = req.params.id;
  await pool.promise()
    .query('update users set name = ?, email = ?, age = ? where id = ?', [json.name, json.email, json.age, id])
  res.json(json);
})

api.listen(port, () => {
  console.log(`Listening on port ${port}`);
})