import React, { ChangeEvent } from 'react';

interface TodoInputProps {
  input: string;
  setInput: (value: string) => void;
  type?: string;
  placeholder?: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ input, setInput, type, placeholder}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <input
      type={type}
      value={input}
      onChange={handleChange}
      className="border p-2 w-[90%] rounded-sm"
      placeholder={placeholder}
    />
  );
};

export default TodoInput;
