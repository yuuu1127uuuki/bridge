import React from 'react';
import Button from '../Atoms/Button';
import axios from 'axios';

// 6年以上前のボタンのコンポーネント

// axios.defaults.baseURL = `http://${hostname}:8000`
axios.defaults.baseURL = 'https://bridge-backend-6wcu.onrender.com';

const PastButton = ({ value, onResults, text }) => {
  const handleClick = async () => {
    axios.get('/getopendata').then(({ data: res }) => {
      if (!res) {
        alert('データがありません');
      } else {
        try {
          // データベースから一致するレコードを取得
          const filteredBridges = res.filter((item) => {
              return item.Date <= value;
            }
          );
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

export default PastButton;
