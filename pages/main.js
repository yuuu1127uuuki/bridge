import React, { useState, useEffect, useRef } from 'react';
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import LogoutButton from '../components/Molecules/LogoutButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Molecules/MapComponent';
import Button from '../components/Atoms/Button';
import axios from 'axios';
import AddModal from '../components/Templates/AddModal';
import EditModal from '../components/Templates/EditModal';
import styles from '../styles/main.module.css';
import NumberOfPins from '../components/Atoms/NumberOfPins';
import PinDeleteButton from '../components/Molecules/PinDeleteButton';
import _idDeleteButton from '../components/Molecules/_idDeleteButton';
import TonnelButton from '../components/Molecules/TonnelButton';
import Pulldowns from '../components/Molecules/Pulldowns';
import HistoryButton from '../components/Molecules/HistoryButton';

axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

export default function Home() {
  const [bridgedata, setBridgedata] = useState([]); // 橋梁データ
  const [filteredData, setFilteredData] = useState([]); // 絞り込んだ橋のデータ
  const [selectedMarker, setSelectedMarker] = useState(null); // 選択されたマーカーのデータ
  const selectedMarkerRef = useRef(selectedMarker);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 追加モーダルの表示状態
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 編集モーダルの表示状態

  useEffect(() => {
    selectedMarkerRef.current = selectedMarker;
  }, [selectedMarker]);

  useEffect(() => {
    // ページが読み込まれた時にデータを取得する
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
    // 検索ワードに一致するデータを絞り込む
    const filtered = bridgedata.filter((item) => item.Name.includes(query));
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert('該当するデータがありません');
    }
  };

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleMarkerClick = (item) => {
    // マーカーがクリックされた時の処理
    setSelectedMarker(item);
  };

  const handleDeleteButtonClick = async () => {
    // 削除ボタンが押された時の処理
    const isConfirmed = window.confirm('本当に削除しますか？');
    if (!isConfirmed) return;

    const marker = selectedMarkerRef.current;
    if (!marker || !marker._id) {
      alert('削除する対象が選択されていません');
      return;
    }

    console.log('ニフラム');
    try {
      const response = await axios.delete(`/deleteopendata/${marker._id}`, {
        method: 'DELETE',
      });
      setSelectedMarker(null);
      alert('削除に成功しました');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('削除中にエラーが発生しました');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Del') {
        handleDeleteButtonClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAddConfilmButtonClick = async (data) => {
    // 追加ボタンが押された時の処理
    const isConfirmed = window.confirm('本当に追加しますか？');
    if (!isConfirmed) return;
    console.log('なかまをよぶ');
    try {
      const response = await axios.post('/postopendata', data);
      alert('追加に成功しました');
      setIsAddModalOpen(false);
      console.log(data); // 送信するデータを確認
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('追加中にエラーが発生しました');
    }
  };
  const handleEditButtonClick = async (data) => {
    // 編集ボタンが押された時の処理
    try {
      const response = await axios.put(
        `/putopendata/${selectedMarker._id}`,
        data
      );
      alert('更新に成功しました');
      setIsEditModalOpen(false);
      window.location.reload();
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
          <TonnelButton />
        </span>

        <h1 className={styles.header}>橋梁情報管理システム</h1>
        <HistoryButton />
        {/* <_idDeleteButton />
        <PinDeleteButton /> */}
        <SearchBox onSearch={handleSearch} />
        <NumberOfPins count={filteredData.length} />
        <span className={styles.reset}>
          <ResetButton />
        </span>
        <span
          style={{
            display: 'flex',
            marginLeft: 'auto',
            width: '25%',
            float: 'left',
          }}
        >
          <Button
            onClick={() => setIsAddModalOpen(true)}
            text="新しい橋梁の追加"
          />
        </span>
        <Pulldowns data={bridgedata} onFilter={handleFilter} />
        <div className={styles.console}>
          <ConsoleWindow
            data={selectedMarker}
            onDelete={handleDeleteButtonClick}
            onEdit={() => setIsEditModalOpen(true)}
          />
        </div>
        <MapConponent
          data={filteredData}
          selected={selectedMarker}
          onMarkerClick={handleMarkerClick}
        />
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
