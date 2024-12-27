import React from 'react';
import FilterButton from '../Molecules/FilterButton';

const RankButtons = ({ handleRankButtonClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'right', height: '25px', }}>
      <FilterButton
        column="Rank"
        value="Ⅰ"
        onResults={handleRankButtonClick}
        text="Ⅰ"
      />
      <FilterButton
        column="Rank"
        value="Ⅱ"
        onResults={handleRankButtonClick}
        text="Ⅱ"
      />
      <FilterButton
        column="Rank"
        value="Ⅲ"
        onResults={handleRankButtonClick}
        text="Ⅲ"
      />
      <FilterButton
        column="Rank"
        value="Ⅳ"
        onResults={handleRankButtonClick}
        text="Ⅳ"
      />
    </div>
  );
};

export default RankButtons;
