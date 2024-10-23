import React from 'react';
import TodoButton from '../../base/TodoButton';
import TodoInput from '../../base/TodoInput';

interface FormInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormInputProps> = ({ input, setInput, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 text-xs md:text-lg">
      <TodoInput input={input} setInput={setInput} type='text' placeholder='Add Todo'/>
      <TodoButton type="submit" className="self-end">
        Add Todo
      </TodoButton>
    </form>
  );
};

export default Form;
