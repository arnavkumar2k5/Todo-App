import React from 'react';
import TodoButton from '../../base/TodoButton';
import TodoInput from '../../base/TodoInput';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  editingTodoId: string | null;
  editText: string;
  setEditText: (text: string) => void;
  handleEditClick: (todo: TodoItem) => void;
  handleSaveClick: (id: string) => void;
  handleCheckboxChange: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

const FormList: React.FC<TodoListProps> = ({
  todos,
  editingTodoId,
  editText,
  setEditText,
  handleEditClick,
  handleSaveClick,
  handleCheckboxChange,
  handleDeleteClick,
}) => {
  return (
    <ul className="list-none text-xs">
      {todos.map((todo) => (
        <li
          className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded overflow-x-auto"
          key={todo.id}
        >
          <div className='flex'>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo.id)}
            className="mr-2"
          />
          {editingTodoId === todo.id ? (
            <TodoInput input={editText} setInput={setEditText} />
          ) : (
            <div className={`text-white ${todo.completed ? 'line-through' : ''}`}>
              {todo.text}
            </div>
          )}
          </div>
          <div className="flex gap-2 md:gap-5 ml-5">
            {editingTodoId === todo.id ? (
              <TodoButton
                onClick={() => handleSaveClick(todo.id)}
                className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
              >
                Save
              </TodoButton>
            ) : (
              <TodoButton
                onClick={() => handleEditClick(todo)}
                className="text-white bg-blue-500 border-0 py-1 px-3 md:px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
              >
                Edit
              </TodoButton>
            )}
            <TodoButton
              onClick={() => handleDeleteClick(todo.id)}
              className="text-white bg-red-500 border-0 py-1 px-2 md:px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              Delete
            </TodoButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FormList;
