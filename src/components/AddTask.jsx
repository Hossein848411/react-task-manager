import { useState } from 'react';

function AddTask({ onAdd }) {
  const [text, setText] = useState(''); // فیکس: فقط text

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text); // فیکس: بدون dueDate
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="تسک جدید اضافه کن..."
        className="task-input"
      />
      <button type="submit" className="add-btn">اضافه</button>
    </form>
  );
}

export default AddTask;