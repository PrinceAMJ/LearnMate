const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
const port = 3000;

// Connect to the SQLite database file
const db = new sqlite3.Database(path.join(__dirname, 'pyqs.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the PDF files from the 'pdfs' folder.
// The URL path will be /pdfs followed by the filename.
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// API endpoint to get all papers from the database
app.get('/api/papers', (req, res) => {
    const sql = 'SELECT file_name, subject, year FROM question_papers ORDER BY year DESC, subject ASC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ papers: rows });
    });
});

const bcrypt = require('bcryptjs');

// API endpoint for user registration (Signup)
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    // Hash the password for security
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password.' });
        }

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.run(sql, [username, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Username already exists.' });
                }
                return res.status(500).json({ error: 'Error creating user.' });
            }
            res.status(201).json({ message: 'User created successfully.', userId: this.lastID });
        });
    });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error during login.' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }
            res.status(200).json({ message: 'Login successful.', userId: user.id });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});