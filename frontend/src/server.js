require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL!');
  }
});

// ✅ Register route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Database error!' });
    }
    console.log('✅ User registered with ID:', result.insertId);
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

// ✅ Start server
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));