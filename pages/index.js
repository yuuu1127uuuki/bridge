import React, { useState } from 'react';
import FilterButton from '../components/Molecules/FilterButton';
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Atoms/MapComponent';
import Button from '../components/Atoms/Button';

const currentYear = new Date().getFullYear();

export default function Home() {
  const handleRankButtonClick = (onResults) => {
    console.log(onResults);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3em' }}>橋梁情報管理システム</h1>
      <Button
        onClick={() => console.log('Buttonがクリックされました')}
        text="追加"
      />
      <SearchBox onSearch={(query) => console.log(query)} />
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
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
      <ResetButton />
      <FilterButton
        column="Date"
        value={currentYear - 1}
        onResults={handleRankButtonClick}
        text="1"
      />
      <FilterButton
        column="Date"
        value={currentYear - 2}
        onResults={handleRankButtonClick}
        text="2"
      />
      <FilterButton
        column="Date"
        value={currentYear - 3}
        onResults={handleRankButtonClick}
        text="3"
      />
      <FilterButton
        column="Date"
        value={currentYear - 4}
        onResults={handleRankButtonClick}
        text="4"
      />
      <FilterButton
        column="Date"
        value={currentYear - 5}
        onResults={handleRankButtonClick}
        text="5"
      />
      {/* <FilterButton column="Date" value={!((currentYear - 1) && (currentYear -2) && (currentYear-3) && (currentYear-4) && (currentYear-5))} onResults={handleRankButtonClick} text="6年以上" /> */}
      <div style={{ marginTop: '20px' }}>
        <ConsoleWindow data={[]} />
      </div>
      <MapConponent data={[]} />
    </div>
  );
}
