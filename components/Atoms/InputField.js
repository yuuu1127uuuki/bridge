import React from 'react';

const InputField = ({ title, label, value, onChange }) => {
  return (
    <div>
      {title}:
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={onChange}
        style={{ marginLeft: '8px' }}
      />
    </div>
  );
};

export default InputField;
