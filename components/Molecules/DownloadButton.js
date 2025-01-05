import React from 'react';
import Button from '../Atoms/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

//Exelファイルをダウンロードするボタン
const DownloadButton = ({ data, filename = 'kyouryou.xlsx' }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert('ダウンロードするデータがありません');
      return;
    }

    // ヘッダーを追加
    const headers = [
      '施設ID',
      '管理事務所名',
      '管理先電話番号',
      '緯度,経度',
      '施設名',
      '施設名カナ',
      '路線',
      '所在地',
      '橋梁の種類',
      '架設年（西暦）',
      '橋長（m）',
      '幅員（m）',
      '種類',
      '次回点検年',
      '最新点検年度',
      '健全度',
    ];

    // データを配列に変換
    const dataArray = data.map((item) => Object.values(item));

    // ヘッダーとデータを結合
    const dataWithHeaders = [headers, ...dataArray];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);

    // テーブル範囲を設定
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    worksheet['!autofilter'] = { ref: XLSX.utils.encode_range(range) };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  };

  return <Button onClick={handleDownload} text={'Excelダウンロード'}></Button>;
};

export default DownloadButton;
