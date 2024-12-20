import React, { useState, useEffect } from 'react';
import FilterButton from '../components/Molecules/FilterButton';
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Atoms/MapComponent';
import Button from '../components/Atoms/Button';
import Modal from '../components/Organisms/Modal';
import axios from 'axios';

axios.defaults.baseURL = 'https://bridge-backend-6wcu.onrender.com';

const currentYear = new Date().getFullYear();

export default function Home() {
  const [isAddModaiOpen, setIsAddModaiOpen] = React.useState(false);
  const [bridgedata, setBridgedata] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    axios
      .get('/getopendata')
      .then((response) => {
        setBridgedata(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
      });
  }, []);

  const handleRankButtonClick = (onResults) => {
    console.log(onResults);
  };

  const handleMarkerClick = (item) => {
    setSelectedMarker(item);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3em' }}>橋梁情報管理システム</h1>
        <Button
          onClick={() => setIsAddModaiOpen(true)}
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
          <ConsoleWindow data={selectedMarker} />
        </div>
        <MapConponent data={bridgedata} onMarkerClick={handleMarkerClick} />
      </div>
      <Modal
        isOpen={isAddModaiOpen}
        title="新しい橋を追加"
        data={[]}
        onClose={() => setIsAddModaiOpen(false)}
        onAddItem={() => {}}
        onCancel={() => setIsAddModaiOpen(false)}
        onConfirm={() => setIsAddModaiOpen(false)}
        onChangeValue={() => {}}
      />
    </>
  );
}
