import React from 'react';
import TodoButton from '../../base/TodoButton';
import TodoInput from '../../base/TodoInput';

interface FormInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormInput: React.FC<FormInputProps> = ({ input, setInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <TodoInput input={input} setInput={setInput} />
      <TodoButton type="submit" className="self-end">
        Add Todo
      </TodoButton>
    </form>
  );
};

export default FormInput;
