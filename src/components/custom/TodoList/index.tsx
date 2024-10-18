import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { editTodo, removeTodo, toggleTodoCompletion } from "../../../store/TodoSlice";
import TodoButton from "../../base/TodoButton";
import TodoInput from "../../base/TodoInput";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean; 
}

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEditClick = (todo: TodoItem) => {
    setEditingTodoId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveClick = (id: string) => {
    dispatch(editTodo({ id, text: editText }));
    setEditingTodoId(null);
  };

  const handleCheckboxChange = (id: string) => {
    dispatch(toggleTodoCompletion(id));
  };

  return (
    <>
      <ul className="list-none">
        {todos.map((todo: TodoItem) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.completed} 
              onChange={() => handleCheckboxChange(todo.id)}
              className="mr-2"
            />
            {editingTodoId === todo.id ? (
              <TodoInput
              input={editText} setInput={setEditText}
              />
            ) : (
              <div className={`text-white ${todo.completed ? "line-through" : ""}`}>
                {todo.text} 
              </div>
            )}
            <div className="flex gap-5 ml-5">
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
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Edit
                </TodoButton>
              )}
              <TodoButton
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                Delete
              </TodoButton>

            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
