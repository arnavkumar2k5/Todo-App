import React from 'react';
import FormInput from '../../components/custom/FormInput';
import FormList from '../../components/custom/FormList';

interface HomeviewProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  todos: Array<{ id: string; text: string; completed: boolean }>;
  editingTodoId: string | null;
  editText: string;
  setEditText: (text: string) => void;
  handleEditClick: (todo: { id: string; text: string; completed: boolean }) => void;
  handleSaveClick: (id: string) => void;
  handleCheckboxChange: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

const Homeview: React.FC<HomeviewProps> = ({
  input,
  setInput,
  handleSubmit,
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
    <div>
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
  );
};

export default Homeview;
