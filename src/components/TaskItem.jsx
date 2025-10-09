import { useState } from 'react';

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // تابع فرمت تاریخ فارسی
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(task.id, editText); // ذخیره
    }
    setIsEditing(false); // خارج از mode
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <div className="task-content">
        {isEditing ? ( // mode ویرایش
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit} // blur = ذخیره
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()} // Enter = ذخیره
            className="edit-input"
            autoFocus
          />
        ) : (
          <>
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <div className="task-meta">
              <small className="created-at">ایجاد: {formatDate(task.createdAt)}</small>
            </div>
          </>
        )}
      </div>
      <div className="task-actions">
        {!isEditing && ( // دکمه ویرایش فقط در mode عادی
          <button onClick={() => setIsEditing(true)} className="edit-btn">ویرایش</button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="delete-btn"
        >
          حذف
        </button>
      </div>
    </li>
  );
}

export default TaskItem;