import React from 'react';
import Button from '../Atoms/Button';

const FilterButton = ({ text, column, value, onFilter }) => {
  const handleClick = () => {
    onFilter(column, value);
  };

  return <Button onClick={handleClick} text={text} />;
};

export default FilterButton;
