import React from 'react';
import Button from '../Atoms/Button';
import axios from 'axios';

// データを絞り込むボタンコンポーネント

// axios.defaults.baseURL = `http://${hostname}:8000`
axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

const FilterButton = ({ column, value, onResults, text }) => {
  const handleClick = async () => {
    axios.get('/getopendata').then(({ data: res }) => {
      if (!res) {
        alert('データがありません');
      } else {
        try {
          // データベースから一致するレコードを取得
          const filteredBridges = res.filter((item) => {
            if (typeof value === 'string') {
              return item[column].includes(value);
            } else if (typeof value === 'number') {
              return item[column] === value;
            }
            return false;
          });
          onResults(filteredBridges);
        } catch (error) {
          console.error('データの取得に失敗しました', error);
        }
      }
    });
  };

  return (
    <Button onClick={handleClick} text={text}>
      {/* {`${column} が "${value}" に一致するレコードを検索`} */}
    </Button>
  );
};

export default FilterButton;
