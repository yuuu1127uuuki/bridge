import React, { useState } from 'react';
import FilterButton from '../components/FilterButton';
import SearchBox from '../components/SearchBox';

export default function Home() {
  const handleRankButtonClick = () => {
    //後で実装
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3em' }}>橋梁情報管理システム</h1>
      <SearchBox onSearch={(query) => console.log(query)} />
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
      <FilterButton column="Rank" value="Ⅰ" onResults={handleRankButtonClick} />
      <FilterButton column="Rank" value="Ⅱ" onResults={handleRankButtonClick} />
      <FilterButton column="Rank" value="Ⅲ" onResults={handleRankButtonClick} />
      <FilterButton column="Rank" value="Ⅳ" onResults={handleRankButtonClick} />
      </div>
    </div>
  );
}
