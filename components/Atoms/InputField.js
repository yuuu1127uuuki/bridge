import React from 'react';

const InputField = ({ label, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={label}
      value={value}
      onChange={onChange}
      style={{ marginLeft: '8px' }}
    />
  );
};

export default InputField;
