import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../../store/TodoSlice';
import TodoInput from '../../base/TodoInput';
import TodoButton from '../../base/TodoButton';

function AddTodo() {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();

  const addTodoHandler = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <TodoInput input={input} setInput={setInput}/>
      <TodoButton>Add</TodoButton>
    </form>
  );
}

export default AddTodo;
