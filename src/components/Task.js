import React from 'react';

const Task = ({ id, text, completed, onToggle }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span style={{ marginLeft: '8px', textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
    </div>
  );
};

export default Task;