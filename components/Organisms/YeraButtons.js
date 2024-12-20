import React from 'react';
import FilterButton from '../Molecules/FilterButton';

const currentYear = new Date().getFullYear();

const YearButtons = ({ handleYearButtonClick }) => {
  return (
    <div>
        <FilterButton
          column="Date"
          value={currentYear - 1}
          onResults={handleYearButtonClick}
          text="1"
        />
        <FilterButton
          column="Date"
          value={currentYear - 2}
          onResults={handleYearButtonClick}
          text="2"
        />
        <FilterButton
          column="Date"
          value={currentYear - 3}
          onResults={handleYearButtonClick}
          text="3"
        />
        <FilterButton
          column="Date"
          value={currentYear - 4}
          onResults={handleYearButtonClick}
          text="4"
        />
        <FilterButton
          column="Date"
          value={currentYear - 5}
          onResults={handleYearButtonClick}
          text="5"
        />
        {/* <FilterButton column="Date" value={!((currentYear - 1) && (currentYear -2) && (currentYear-3) && (currentYear-4) && (currentYear-5))} onResults={handleRankButtonClick} text="6年以上" /> */}
    </div>
  );
};

export default YearButtons;