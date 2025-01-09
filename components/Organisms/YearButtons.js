import React from 'react';
import FilterButton from '../Molecules/FilterButton';
import PastButton from '../Molecules/PastButton';

const currentYear = new Date().getFullYear();

const YearButtons = ({ handleYearButtonClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'right', height: '25px' }}>
      <FilterButton
        column="Date"
        value={currentYear - 1}
        onFilter={handleYearButtonClick}
        text="1"
      />
      <FilterButton
        column="Date"
        value={currentYear - 2}
        onFilter={handleYearButtonClick}
        text="2"
      />
      <FilterButton
        column="Date"
        value={currentYear - 3}
        onFilter={handleYearButtonClick}
        text="3"
      />
      <FilterButton
        column="Date"
        value={currentYear - 4}
        onFilter={handleYearButtonClick}
        text="4"
      />
      <FilterButton
        column="Date"
        value={currentYear - 5}
        onFilter={handleYearButtonClick}
        text="5"
      />
      <PastButton
        value={currentYear - 6}
        onFilter={handleYearButtonClick}
        text="6年以上"
      />
    </div>
  );
};

export default YearButtons;
