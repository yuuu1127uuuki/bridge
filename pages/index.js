import React, { useState, useEffect } from 'react';
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Atoms/MapComponent';
import Button from '../components/Atoms/Button';
import axios from 'axios';
import RankButtons from '../components/Organisms/RankButtons';
import YearButtons from '../components/Organisms/YearButtons';
import AddModal from '../components/Templates/AddModal';
import EditModal from '../components/Templates/EditModal';

axios.defaults.baseURL = 'https://bridge-backend-6wcu.onrender.com';

export default function Home() {
  const [bridgedata, setBridgedata] = useState([]); //表示する橋のデータ
  const [filteredData, setFilteredData] = useState([]); //検索と絞り込みのデータ
  const [selectedMarker, setSelectedMarker] = useState(null); //選択された橋のデータ
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); //追加モーダルの表示
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //編集モーダルの表示

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

  const handleSearch = (query) => { //検索ボックスに入力した時の処理
    const filtered = bridgedata.filter((item) => item.Name.includes(query));
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert('該当するデータがありません');
    }
  };

  const handleRankButtonClick = (onResults) => { //健全度ボタンを押した時の処理
    const filtered = onResults;
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert('該当するデータがありません');
    }
  };

  const handleMarkerClick = (item) => { //マーカーをクリックした時の処理
    setSelectedMarker(item);
  };

  const handleDeleteButtonClick = async () => { //削除ボタンを押した時の処理
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
      setSelectedMarker(null);
    } catch (error) {
      console.error(error);
      alert('削除中にエラーが発生しました');
    }
  };

  const handleAddConfilmButtonClick = async (data) => { //追加ボタンを押した時の処理
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
  const handleEditButtonClick = async (data) => { //編集ボタンを押した時の処理
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
      <div style={{ textAlign: 'center', backgroundColor: '#fdffe7' }}>
        <h1 style={{ fontSize: '3em', color: '#8c7676', marginTop: '0px' }}>
          橋梁情報管理システム
        </h1>
        <Button onClick={() => setIsAddModalOpen(true)} text="追加" />
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
