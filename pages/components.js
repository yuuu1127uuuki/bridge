import SearchBox from '../components/Atoms/SearchBox';
import Button from '../components/Atoms/Button';
import FilterButton from '../components/Molecules/FilterButton';
import ResetButton from '../components/Molecules/ResetButton';
import { useState, useEffect } from 'react';
import InfoWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Atoms/MapComponent';
import InputField from '../components/Atoms/InputField';
import axios from 'axios';
import React from 'react';
import Modal from '../components/Organisms/Modal';

axios.defaults.baseURL = 'https://bridge-backend-6wcu.onrender.com';

export default function About() {
  const [searchResult, setSearchResult] = useState('');
  const [bridgedata, setBridgedata] = useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(['初期項目1', '初期項目2']);

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

  const handleSearch = (query) => {
    console.log('Search query:', query);
    setSearchResult(query); // 実際にはAPI呼び出しなどに利用
  };

  const handleButtonClick = () => {
    console.log('Buttonがクリックされました');
    // ボタンがクリックされたときの処理をここに追加
  };

  const handleFilterResults = (results) => {
    console.log(results);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    setModalData([...modalData, `追加項目${modalData.length + 1}`]);
  };

  const handleChangeValue = (value, index) => {
    const newData = [...modalData];
    newData[index] = value;
    setModalData(newData);
  };

  const handleCancel = () => {
    // キャンセル処理
    closeModal();
  };

  const handleConfirm = () => {
    // 確認処理
    closeModal();
  };

  // components 内のコンポーネントを表示する
  return (
    <div>
      <h1>コンポーネント一覧</h1>
      <div style={{ padding: '16px' }}>
        <h1>Search Box Example</h1>
        <SearchBox onSearch={handleSearch} />
        {searchResult && (
          <p>
            Search Result: <strong>{searchResult}</strong>
          </p>
        )}
        <div style={{ padding: '16px' }}>
          {/* Button コンポーネントを追加 */}
          <h1>Button Example</h1>
          <Button onClick={handleButtonClick} text="ボタン"></Button>
        </div>
        <div style={{ padding: '16px' }}>
          <h1>InputField Example</h1>
          <InputField
            title={'ID'}
            label="ここに入力"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div style={{ padding: '16px' }}>
          {/* FilterButton コンポーネントを追加 */}
          <h1>Filter Button Example</h1>
          <FilterButton
            column="Rank"
            value="Ⅱ"
            onResults={handleFilterResults}
            text="Ⅱ"
          />
        </div>
        <div style={{ padding: '16px' }}>
          {/* ResetButton コンポーネントを追加 */}
          <h1>Reset Button Example</h1>
          <ResetButton />
        </div>
        <div style={{ padding: '16px' }}>
          <h1>ConsoleWindow Example</h1>
          <InfoWindow
            data={{ _id: '123456-78-90', Name: '橋梁名', Id: '37,135' }}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <h1>Map Example</h1>
          <MapConponent data={bridgedata} />
        </div>
        <div style={{ padding: '16px' }}>
          <h1>Modal Example</h1>
          <button onClick={openModal}>Open Modal</button>
          <Modal
            isOpen={isModalOpen}
            title="モーダルタイトル"
            data={modalData}
            onClose={closeModal}
            onAddItem={handleAddItem}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            onChangeValue={handleChangeValue}
          />
        </div>
      </div>
    </div>
  );
}
