const express = require('express');
require('dotenv').config();
const authRoutes = require('./Routes/auth');  // Import the auth routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the routes from auth.js
app.use('/auth', authRoutes);  // All routes in auth.js will be prefixed with '/auth'

// Example of a protected route (not in auth.js)
app.get('/dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Welcome to your dashboard', userId: decoded.userId });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
