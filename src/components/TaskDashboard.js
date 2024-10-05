import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../App.css';

function TaskDashboard({ username }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${username}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [username]);

  const handleStatusChange = async (taskId, status) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { status });
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status } : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/')}  // Navigate to home page
        style={{
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'block',
          margin: '0 auto'
        }}
      >
        Back to Home
      </button>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Logged in as: {username}
      </h3>
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
        {tasks.map(task => (
          <li 
            key={task._id} 
            style={{ 
              marginBottom: '10px', 
              padding: '15px', 
              border: '3px solid #ddd', 
              borderRadius: '5px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <span>{task.title} - {task.status}</span>
            <div>
              <button 
                onClick={() => handleStatusChange(task._id, 'Pending')} 
                style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '5px', 
                  marginRight: '5px', 
                  cursor: 'pointer' 
                }}
              >
                Pending
              </button>
              <button 
                onClick={() => handleStatusChange(task._id, 'Completed')} 
                style={{ 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}
              >
                Completed
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDashboard;
