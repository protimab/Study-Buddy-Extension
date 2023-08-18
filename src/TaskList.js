import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle }) => {
  return (
    <div>
      {tasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;
