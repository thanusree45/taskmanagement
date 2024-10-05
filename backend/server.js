const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { AdminLogin, UserLogin, Task } = require('./models/tm'); // Import models
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected...');
    // Start fetching data every 5 minutes
    // setInterval(fetchCryptoData, 5 * 60 * 1000); // Assuming fetchCryptoData is defined somewhere
    // fetchCryptoData(); // Initial fetch
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Registration Route
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (role === 'admin') {
      const admin = new AdminLogin({ username, password });
      await admin.save();
      res.status(201).send('Admin registered successfully');
    } else if (role === 'user') {
      const user = new UserLogin({ username, password });
      await user.save();
      res.status(201).send('User registered successfully');
    } else {
      res.status(400).send('Invalid role');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login Routes
app.post('/user-login', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserLogin.findOne({ username, password });
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminLogin.findOne({ username, password });
  if (admin) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Admin Routes
app.get('/users', async (req, res) => {
  try {
    const users = await UserLogin.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/tasks', async (req, res) => {
  const { username, title } = req.body;
  try {
    const newTask = new Task({ username, title });
    await newTask.save();
    res.status(201).send('Task assigned successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// User Task Management Routes
app.get('/tasks/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const tasks = await Task.find({ username });
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Task.findByIdAndUpdate(id, { status });
    res.status(200).send('Task updated successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
