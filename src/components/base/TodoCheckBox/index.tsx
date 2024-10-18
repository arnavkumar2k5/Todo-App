import React from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        name="check-box"
        id="check-box"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckBox;