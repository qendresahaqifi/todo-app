import React, { useState } from 'react';
import { CheckIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo, timestamp }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => setIsEditing(true);

  const saveEdit = () => {
    if (editText.trim() !== "") {
      editTodo(id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  return (
    <div className="flex items-center my-3 gap-2 animate-fadeIn transition-all duration-300 ease-in-out transform hover:scale-105 motion-safe:animate-fadeIn">
      <div className="flex flex-1 items-center">
        
        <button
            onClick={() => toggle(id)}
        >
            {isComplete ? <CheckIcon className='text-green-700 w-6 h-6 font-bold cursor-pointer' /> : <StopIcon className='w-6 h-6 font-bold cursor-pointer' />}
        </button>
        {isEditing ? (
          <input
            type="text"
            className="ml-4 flex-1 px-2 py-1 border rounded outline-none focus:ring focus:ring-blue-300"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <p
            onDoubleClick={handleEdit}
            className={`text-slate-700 dark:text-white ml-4 text-[17px] decoration-slate-500 dark:decoration-white flex-1 cursor-text ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}

        {timestamp && (
            <p className="ml-12 text-xs text-gray-400 dark:text-gray-300">
                Added: {format(new Date(timestamp), "MMM dd, h:mm a")}
            </p>
        )}
      </div>

      <button onClick={() => deleteTodo(id)} className="w-5 cursor-pointer"><TrashIcon  /></button>

    </div>
  );
};

export default TodoItems;
