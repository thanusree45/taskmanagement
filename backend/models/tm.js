const mongoose = require('mongoose');

// Define schema for admin logins
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
}, { collection: 'adminlogins' }); // Specify the admin logins collection

// Define schema for user logins
const userSchema = new mongoose.Schema({
  username: String,
  password: String
}, { collection: 'userlogins' }); // Specify the user logins collection

// Define schema for tasks
const taskSchema = new mongoose.Schema({
  username: String,
  title: String,
  status: { type: String, enum: ['pending', 'doing'], default: 'pending' }
}, { collection: 'tasks' }); // Specify the tasks collection

// Export models
const AdminLogin = mongoose.model('AdminLogin', adminSchema);
const UserLogin = mongoose.model('UserLogin', userSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = { AdminLogin, UserLogin, Task };
