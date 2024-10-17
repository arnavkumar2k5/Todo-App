import React, { ChangeEvent } from 'react';

interface TodoInputProps {
  input: string;
  setInput: (value: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ input, setInput }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <input
      type="text"
      value={input}
      onChange={handleChange}
      className="border p-2 w-[90%]"
      placeholder="Add a todo"
    />
  );
};

export default TodoInput;
