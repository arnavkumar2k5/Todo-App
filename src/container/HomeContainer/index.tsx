import React, { useState } from 'react';
import FormInput from '../../components/custom/FormInput';
import FormList from '../../components/custom/FormList';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, toggleTodoCompletion, removeTodo } from '../../store/TodoSlice';
import { RootState } from '../../store/store'; 

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const HomeContainer: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const todos = useSelector((state: RootState) => state.todos.todos);
  
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput(''); 
    }
  };

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

  const handleDeleteClick = (id: string) => {
    dispatch(removeTodo(id)); 
  };

  return (
    <div className='m-3 md:w-[80%] md:m-auto md:mt-10'>
      <div className='text-3xl mb-5 md:text-7xl font-semibold text-center md:mb-10 border-2 border-gray-200'><i>TODO - APP</i></div>
    <div className='p-2 border-2 border-gray-200'>
      <FormInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
      <FormList
        todos={todos}
        editingTodoId={editingTodoId}
        editText={editText}
        setEditText={setEditText}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleCheckboxChange={handleCheckboxChange}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
    </div>
  );
};

export default HomeContainer;
