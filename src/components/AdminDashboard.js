import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchUsers();
    fetchTasks();
  }, []);

  const handleAssignTask = async () => {
    try {
      await axios.post('http://localhost:5000/tasks', { username: selectedUser, title: taskTitle });
      setTaskTitle('');
      setSelectedUser('');
      // Refresh tasks
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.3)' 
    ,padding:'10px',width:'100vw',display:'flex',
    justifyContent:'center',
    alignItems:'center',flexDirection:'column'}}>
      <h3>Employees</h3>
      <ul style={{ listStyleType: 'square' }}>
        {users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>

      <h3>Assign Tasks</h3>
      <div>
        <label>Select Employee: </label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select Employee</option>
          {users.map(user => (
            <option key={user._id} value={user.username}>{user.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Task: </label>
        <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
      </div>
      <button style={{width:'80px',backgroundColor:'#007bff',color:'white',marginTop:'5px',border: 'none', }}
      onClick={handleAssignTask}>Assign Task</button>

<h3>Tasks Assigned</h3>
<table style={{ width: '90%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map(task => (
      <tr key={task._id}>
        <td style={{ border: '1px solid black', padding: '8px' }}>{task.username}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{task.title}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{task.status}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default AdminDashboard;
