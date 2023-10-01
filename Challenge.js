
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(morgan('dev')); // Morgan logger

// Dummy users data
let users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// POST a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[index] = { ...users[index], ...updatedUser };
  res.json(users[index]);
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.json(deletedUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
