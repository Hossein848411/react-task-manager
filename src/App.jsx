import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const now = Date.now();
    const newTask = { 
      id: Date.now(), 
      text: text.trim(), 
      completed: false, 
      createdAt: now 
    };
    setTasks(prevTasks => [...prevTasks, newTask]); // functional update برای ایمن‌تر شدن
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); // functional update
  };

  const toggleTask = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )); // functional update
  };

  // جدید: تابع ویرایش
  const editTask = (id, newText) => {
    if (!newText.trim()) return;
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    )); // functional update
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>
      
      <AddTask onAdd={addTask} />
      
      <div className="filter-buttons">
        {['all', 'pending', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
          >
            {status === 'all' ? 'همه' : status === 'pending' ? 'در حال انجام' : 'انجام‌شده'}
          </button>
        ))}
      </div>
      
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask} // جدید: props برای ویرایش
      />
      
      {filteredTasks.length === 0 && (
        <p className="empty-message">هیچ تسکی نیست!</p>
      )}
    </div>
  );
}

export default App;