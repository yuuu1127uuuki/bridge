import React, { useState, useEffect } from 'react';
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import LogoutButton from '../components/Molecules/LogoutButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Atoms/MapComponent';
import Button from '../components/Atoms/Button';
import axios from 'axios';
import RankButtons from '../components/Organisms/RankButtons';
import YearButtons from '../components/Organisms/YearButtons';
import AddModal from '../components/Templates/AddModal';
import EditModal from '../components/Templates/EditModal';
import styles from '../styles/main.module.css';
import DownloadButton from '../components/Molecules/DownloadButton';
import HistoryButton from '../components/Molecules/HistoryButton';
import ExcelFormatButton from '../components/Molecules/ExcelFormatButton';


axios.defaults.baseURL = 'https://bridge-backend-6wcu.onrender.com';

export default function Home() {
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleDeleteButtonClick = async () => {
    const isConfirmed = window.confirm('本当に削除しますか？');
    if (!isConfirmed) return;

    console.log('ニフラム');
    try {
      const response = await axios.delete(
        `/deleteopendata/${selectedMarker._id}`,
        {
          method: 'DELETE',
        }
      );
      alert('削除に成功しました');
    } catch (error) {
      console.error(error);
      alert('削除中にエラーが発生しました');
    }
  };

  const handleAddConfilmButtonClick = async (data) => {
    const isConfirmed = window.confirm('本当に追加しますか？');
    if (!isConfirmed) return;
    console.log('なかまをよぶ');
    try {
      const response = await axios.post('/postopendata', data);
      alert('追加に成功しました');
      console.log(data); // 送信するデータを確認
    } catch (error) {
      console.error(error);
      alert('追加中にエラーが発生しました');
    }
  };
  const handleEditButtonClick = async (data) => {
    try {
      const response = await axios.put(
        `/putopendata/${selectedMarker._id}`,
        data
      );
      alert('更新に成功しました');
      console.log(data);
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('更新中にエラーが発生しました');
    }
  };

  return (
    <>
      <div className={styles.all}>
        <span className={styles.Logout}>
          <LogoutButton />
        </span>
        <h1 className={styles.header}>
          橋梁情報管理システム
        </h1>
        <HistoryButton />
        <ExcelFormatButton />
        <DownloadButton data={filteredData} />
        <SearchBox onSearch={handleSearch} />
        <span className={styles.reset}>
          <ResetButton />
        </span>
        <div className={styles.rank}>
          健 全 度 ：
          <RankButtons handleRankButtonClick={handleRankButtonClick} />
        </div>
        <span style={{ display: 'flex', marginLeft: 'auto', width: '25%', float: 'left' }}>
          <Button onClick={() => setIsAddModalOpen(true)} text="新しい橋梁の追加" />
        </span>
        <div className={styles.year}>
          経過年度：
          <YearButtons handleYearButtonClick={handleRankButtonClick} />
        </div>
        <div className={styles.console}>
          <ConsoleWindow
            data={selectedMarker}
            onDelete={handleDeleteButtonClick}
            onEdit={() => setIsEditModalOpen(true)}
          />
        </div>
        <MapConponent data={filteredData} onMarkerClick={handleMarkerClick} />
        <AddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCancel={() => setIsAddModalOpen(false)}
          onConfirm={(data) => handleAddConfilmButtonClick(data)}
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
          onConfirm={(data) => handleEditButtonClick(data)}
          editData={selectedMarker}
        />
      </div>
    </>
  );
}
