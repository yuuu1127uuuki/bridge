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
import DownloadButton from '../components/Molecules/DownloadButton';
import HistoryButton from '../components/Molecules/HistoryButton';
import ExcelFormatButton from '../components/Molecules/ExcelFormatButton';
import NumberOfPins from '../components/Atoms/NumberOfPins';
import InputExcelButton from '../components/Molecules/inputExcelButton';
import PinDeleteButton from '../components/Molecules/PinDeleteButton';
import _idDeleteButton from '../components/Molecules/_idDeleteButton';
import TonnelButton from '../components/Molecules/TonnelButton';
import Menu from '../components/Templates/menu';
import FilterButton from '../components/Molecules/FilterButton';

axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

export default function Home() {
  const [bridgedata, setBridgedata] = useState([]); // 橋梁データ
  const [filteredData, setFilteredData] = useState([]); // 絞り込んだ橋のデータ
  const [selectedMarker, setSelectedMarker] = useState(null); // 選択されたマーカーのデータ
  const selectedMarkerRef = useRef(selectedMarker);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 追加モーダルの表示状態
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 編集モーダルの表示状態
  const currentYear = new Date().getFullYear();

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

  const handleMarkerClick = (item) => {
    // マーカーがクリックされた時の処理
    setSelectedMarker(item);
  };

  const handleRankButtonClick = (column, value) => {
    const filtered = bridgedata.filter((item) => item[column].includes(value));
    setFilteredData(filtered)
  };

  const handleYearButtonClick = (column, value) => {
    const filtered = bridgedata.filter((item) => item[column] === value);
    setFilteredData(filtered);
  };

  const handleManyYearButtonClick = (value) => {
    const filtered = bridgedata.filter((item) => item.Date <= value);
    setFilteredData(filtered);
  }

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

  const menuItems1 = [
    {
      name: '健全度', elements: [
        <FilterButton
          column="Rank"
          value="Ⅰ"
          onFilter={handleRankButtonClick}
          text="Ⅰ"
        />,
        <FilterButton
          column="Rank"
          value="Ⅱ"
          onFilter={handleRankButtonClick}
          text="Ⅱ"
        />,
        <FilterButton
          column="Rank"
          value="Ⅲ"
          onFilter={handleRankButtonClick}
          text="Ⅲ"
        />,
        <FilterButton
          column="Rank"
          value="Ⅳ"
          onFilter={handleRankButtonClick}
          text="Ⅳ"
        />]
    }
  ];

  const menuItems2 = [
    {
      name: '最終点検年からの経過年数', elements: [
        <FilterButton
          column="Date"
          value={currentYear - 1}
          onFilter={handleYearButtonClick}
          text="1"
        />,
        <FilterButton
          column="Date"
          value={currentYear - 2}
          onFilter={handleYearButtonClick}
          text="2"
        />,
        <FilterButton
          column="Date"
          value={currentYear - 3}
          onFilter={handleYearButtonClick}
          text="3"
        />,
        <FilterButton
          column="Date"
          value={currentYear - 4}
          onFilter={handleYearButtonClick}
          text="4"
        />,
        <FilterButton
          column="Date"
          value={currentYear - 5}
          onFilter={handleYearButtonClick}
          text="5"
        />,
        <Button
          text={'6年以上'}
          onClick={() => handleManyYearButtonClick(currentYear - 6)}
        />,
      ]
    }
  ];

  const menuItems3 = [
    { name: 'Excel入出力', elements: [<ExcelFormatButton />, <InputExcelButton />, <DownloadButton data={filteredData} />] }
  ];
  const menuItems4 = [
    { name: 'まとめて削除', elements: [<_idDeleteButton />, <PinDeleteButton />] }
  ];

  return (
    <>
      <div className={styles.all}>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>橋梁情報管理システム</h1>
          <SearchBox onSearch={handleSearch} />
          <span className={styles.Num}>
            <NumberOfPins count={filteredData.length} />
          </span>
          <div className={styles.Button}>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              text="新しい橋梁の追加"
            />
            <ResetButton />
            <TonnelButton />
            <HistoryButton />
            <LogoutButton />
          </div>
        </div>
        <div className={styles.menuRow}>
          <Menu menuItems={menuItems1} />
          <Menu menuItems={menuItems2} />
          <Menu menuItems={menuItems3} />
          <Menu menuItems={menuItems4} />
        </div>
        <span
          style={{
            display: 'flex',
            marginLeft: 'auto',
            width: '25%',
            float: 'left',
          }}
        >

        </span>
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
