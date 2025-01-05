import React, { useRef } from 'react';
import Button from '../Atoms/Button';
import * as XLSX from 'xlsx';
import axios from 'axios';

const InputExcelButton = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // ここでworksheetの内容を確認
        console.log('読み込んだワークシート:', worksheet);

        let json = XLSX.utils.sheet_to_json(worksheet);

        // JSONファイルの項目名を変更し、データがない場合はnullを設定
        json = json.map((item) => ({
          _id: item['施設ID'] || null,
          Inspector: item['管理事務所名'] || null,
          Tel: item['管理先電話番号'] || null,
          Id: item['緯度,経度'] || null,
          Name: item['施設名'] || null,
          Kana: item['施設名カナ'] || null,
          Road: item['路線'] || null,
          address: item['所在地'] || null,
          Keisiki: item['橋梁の種類'] || null,
          birth: item['架設年（西暦）'] || null,
          length: item['橋長（m）'] || null,
          width: item['幅員（m）'] || null,
          HowUse: item['種類'] || null,
          Schedule: item['次回点検'] || null,
          Date: item['最新点検年度'] || null,
          Rank: item['健全度'] || null,
        }));

        console.log('読み込んだデータ:', XLSX.utils.sheet_to_json(worksheet));
        console.log('送信前のファイル内容:', json);

        // 各行を個別にPOSTリクエストで送信
        for (const row of json) {
          try {
            const response = await axios.post('/postopendata', row);
            console.log('送信されたデータ:', response.data);
          } catch (error) {
            console.error('データの送信中にエラーが発生しました:', error);
          }
        }
        alert('データの送信が完了しました');
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <Button text="Excel入力" onClick={handleButtonClick} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xlsx, .xls"
      />
    </>
  );
};

export default InputExcelButton;
