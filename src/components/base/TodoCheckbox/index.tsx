import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const TodoCheckbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
  );
};

export default TodoCheckbox;