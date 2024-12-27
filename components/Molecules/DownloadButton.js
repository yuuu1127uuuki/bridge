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
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  };

  return <Button onClick={handleDownload} text={'Excelダウンロード'}></Button>;
};

export default DownloadButton;
