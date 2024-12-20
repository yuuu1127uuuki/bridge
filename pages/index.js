import React, { useState, useEffect } from 'react';
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Atoms/MapComponent';
import Button from '../components/Atoms/Button';
import Modal from '../components/Organisms/Modal';
import axios from 'axios';
import RankButtons from '../components/Organisms/RankButtons';
import YearButtons from '../components/Organisms/YeraButtons';

axios.defaults.baseURL = 'https://bridge-backend-6wcu.onrender.com';

export default function Home() {
  const [isAddModaiOpen, setIsAddModaiOpen] = React.useState(false);
  const [isEditModaiOpen, setIsEditModaiOpen] = React.useState(false);
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    axios
      .get('/getopendata')
      .then((response) => {
        setBridgedata(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = bridgedata.filter((item) => item.Name.includes(query));
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert('該当するデータがありません');
    }
  };

  const handleRankButtonClick = (onResults) => {
    const filtered = onResults;
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert('該当するデータがありません');
    }
  };

  const handleMarkerClick = (item) => {
    setSelectedMarker(item);
  };

  const handleDeleteButtonClick = () => {};

  return (
    <>
      <div style={{ textAlign: 'center', backgroundColor: '#fdffe7' }}>
        <h1 style={{ fontSize: '3em', color: '#8c7676', marginTop: '0px' }}>
          橋梁情報管理システム
        </h1>
        <Button onClick={() => setIsAddModaiOpen(true)} text="追加" />
        <SearchBox onSearch={handleSearch} />
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <RankButtons handleRankButtonClick={handleRankButtonClick} />
        </div>
        <ResetButton />
        <YearButtons handleYearButtonClick={handleRankButtonClick} />
        <div style={{ marginTop: '20px' }}>
          <ConsoleWindow
            data={selectedMarker}
            onDelete={handleDeleteButtonClick}
            onEdit={() => setIsEditModaiOpen(true)}
          />
        </div>
        <MapConponent data={filteredData} onMarkerClick={handleMarkerClick} />
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
      <Modal
        isOpen={isEditModaiOpen}
        title="橋梁情報修正"
        data={[]}
        onClose={() => setIsEditModaiOpen(false)}
        onAddItem={() => {}}
        onCancel={() => setIsEditModaiOpen(false)}
        onConfirm={() => setIsEditModaiOpen(false)}
        onChangeValue={() => {}}
      />
    </>
  );
}
